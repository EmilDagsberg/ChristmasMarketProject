import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8787);

const emailRecipient = process.env.APPLICATION_EMAIL_TO || "emildagsberg@hotmail.dk";
const openAIModel = process.env.OPENAI_MODEL || "gpt-5.5";

const categorySchema = {
  type: "object",
  properties: {
    primaryCategory: {
      type: "string",
      enum: [
        "Mad",
        "Drikke",
        "Søde sager",
        "Kunsthåndværk",
        "Keramik",
        "Smykker",
        "Tekstil",
        "Dekoration",
        "Børn & aktiviteter",
        "Litteratur & papir",
        "Velvære",
        "Sæsonvarer",
        "Andet"
      ]
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      },
      minItems: 2,
      maxItems: 6
    },
    reasoning: {
      type: "string"
    }
  },
  required: ["primaryCategory", "tags", "reasoning"],
  additionalProperties: false
};

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    emailConfigured: hasSmtpConfig(),
    aiConfigured: Boolean(process.env.OPENAI_API_KEY)
  });
});

app.post("/api/applications", async (request, response) => {
  try {
    const application = sanitizeApplication(request.body || {});
    const validationError = validateApplication(application);

    if (validationError) {
      return response.status(400).json({
        message: validationError
      });
    }

    const classification = await classifyApplication(application);
    const emailResult = await sendApplicationEmail(application, classification);

    return response.json({
      message: emailResult.sent
        ? `Ansøgningen er sendt videre til ${emailRecipient}.`
        : `Ansøgningen er klar, men automatisk afsendelse er ikke sat helt op endnu.`,
      classification,
      email: emailResult
    });
  } catch (error) {
    console.error("Application submission failed", error);

    return response.status(500).json({
      message: "Serveren kunne ikke behandle ansøgningen. Tjek server-konfigurationen og prøv igen."
    });
  }
});

app.listen(port, () => {
  console.log(`Christmas market server listening on http://127.0.0.1:${port}`);
});

function sanitizeApplication(input) {
  return {
    companyName: String(input.companyName || "").trim(),
    contactName: String(input.contactName || "").trim(),
    email: String(input.email || "").trim(),
    phone: String(input.phone || "").trim(),
    website: String(input.website || "").trim(),
    category: String(input.category || "").trim(),
    placement: String(input.placement || "").trim(),
    standSize: String(input.standSize || "").trim(),
    previousParticipation: String(input.previousParticipation || "").trim(),
    powerNeed: String(input.powerNeed || "").trim(),
    description: String(input.description || "").trim(),
    assets: String(input.assets || "").trim(),
    compliance: String(input.compliance || "").trim(),
    rulesAccepted: Boolean(input.rulesAccepted),
    privacyAccepted: Boolean(input.privacyAccepted)
  };
}

function validateApplication(application) {
  const requiredFields = [
    ["companyName", "Firmanavn mangler."],
    ["contactName", "Kontaktperson mangler."],
    ["email", "E-mail mangler."],
    ["phone", "Telefonnummer mangler."],
    ["placement", "Placering mangler."],
    ["standSize", "Standstørrelse mangler."],
    ["previousParticipation", "Tidligere deltagelse mangler."],
    ["powerNeed", "Oplysning om strøm mangler."],
    ["description", "Beskrivelse af produkter og stand mangler."]
  ];

  for (const [field, message] of requiredFields) {
    if (!application[field]) {
      return message;
    }
  }

  if (!application.rulesAccepted || !application.privacyAccepted) {
    return "Regler og behandling af oplysninger skal accepteres.";
  }

  return "";
}

async function classifyApplication(application) {
  if (!process.env.OPENAI_API_KEY) {
    return heuristicClassification(application, "heuristic");
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const input = [
      "Kategoriser denne ansøgning til et dansk julemarked.",
      "Svar kun med JSON i det ønskede schema.",
      "",
      `Virksomhed: ${application.companyName}`,
      `Kontaktperson: ${application.contactName}`,
      `Egen kategori: ${application.category || "-"}`,
      `Beskrivelse: ${application.description}`,
      `Links/portfolio: ${application.assets || "-"}`,
      `Praktiske noter: ${application.compliance || "-"}`,
      `Placering: ${application.placement}`,
      `Standstørrelse: ${application.standSize}`
    ].join("\n");

    const aiResponse = await client.responses.create({
      model: openAIModel,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "vendor_category",
          strict: true,
          schema: categorySchema
        }
      }
    });

    const parsed = JSON.parse(aiResponse.output_text);

    return {
      ...parsed,
      source: "ai"
    };
  } catch (error) {
    console.warn("AI categorization failed, falling back to heuristic classification.", error);
    return heuristicClassification(application, "fallback");
  }
}

function heuristicClassification(application, source) {
  const text = `${application.category} ${application.description} ${application.assets}`.toLowerCase();

  const rules = [
    {
      primaryCategory: "Mad",
      tags: ["mad", "delikatesser", "smag"],
      keywords: ["mad", "pølse", "ost", "honning", "chutney", "krydderi", "delikatesse", "fødevare"]
    },
    {
      primaryCategory: "Drikke",
      tags: ["drikke", "saft", "vin"],
      keywords: ["drikke", "vin", "øl", "most", "saft", "gløgg", "kaffe", "te"]
    },
    {
      primaryCategory: "Søde sager",
      tags: ["sødt", "kager", "chokolade"],
      keywords: ["kage", "chokolade", "bolsje", "karamel", "lakrids", "dessert", "småkage"]
    },
    {
      primaryCategory: "Keramik",
      tags: ["keramik", "håndlavet", "brugskunst"],
      keywords: ["keramik", "ler", "stentøj", "porcelæn"]
    },
    {
      primaryCategory: "Smykker",
      tags: ["smykker", "design", "gaver"],
      keywords: ["smykke", "ørering", "halskæde", "armbånd", "ring"]
    },
    {
      primaryCategory: "Tekstil",
      tags: ["tekstil", "strik", "syet"],
      keywords: ["tekstil", "strik", "stof", "syet", "broderi", "tørklæde", "pude"]
    },
    {
      primaryCategory: "Dekoration",
      tags: ["julepynt", "dekoration", "interiør"],
      keywords: ["dekoration", "julepynt", "krans", "blomst", "interiør", "lysestage"]
    },
    {
      primaryCategory: "Børn & aktiviteter",
      tags: ["børn", "aktiviteter", "leg"],
      keywords: ["børn", "lege", "aktivitet", "værksted", "spil", "legetøj"]
    },
    {
      primaryCategory: "Litteratur & papir",
      tags: ["papir", "kort", "bøger"],
      keywords: ["bog", "kort", "print", "illustration", "plakat", "papir", "notesbog"]
    },
    {
      primaryCategory: "Velvære",
      tags: ["velvære", "duft", "pleje"],
      keywords: ["sæbe", "creme", "hudpleje", "velvære", "duft", "olie"]
    }
  ];

  const match = rules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));

  if (match) {
    return {
      primaryCategory: match.primaryCategory,
      tags: match.tags,
      reasoning: "Kategorien er foreslået ud fra nøgleord i virksomhedens beskrivelse.",
      source
    };
  }

  return {
    primaryCategory: "Andet",
    tags: ["andet", "unik stand", "manuel vurdering"],
    reasoning: "Ansøgningen ligner ikke en kendt standardkategori og bør vurderes manuelt.",
    source
  };
}

async function sendApplicationEmail(application, classification) {
  const fallbackDraft = buildFallbackMailto(application, classification);

  if (!hasSmtpConfig()) {
    return {
      sent: false,
      mode: "fallback",
      reason: "missing_smtp_config",
      fallbackDraft
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: emailRecipient,
      replyTo: application.email,
      subject: `Ny stadeholderansøgning - ${application.companyName}`,
      text: buildEmailBody(application, classification)
    });

    return {
      sent: true,
      mode: "smtp",
      messageId: info.messageId
    };
  } catch (error) {
    console.warn("SMTP sending failed, falling back to mailto draft.", error);

    return {
      sent: false,
      mode: "fallback",
      reason: error?.code || "smtp_error",
      fallbackDraft
    };
  }
}

function buildEmailBody(application, classification) {
  return [
    "Ny ansøgning til Engestofte Julemarked",
    "",
    `Virksomhed: ${application.companyName}`,
    `Kontaktperson: ${application.contactName}`,
    `E-mail: ${application.email}`,
    `Telefon: ${application.phone}`,
    `Hjemmeside / SoMe: ${application.website || "-"}`,
    "",
    `Egen kategori: ${application.category || "-"}`,
    `AI hovedkategori: ${classification.primaryCategory}`,
    `AI tags: ${classification.tags.join(", ")}`,
    `AI begrundelse: ${classification.reasoning}`,
    `AI kilde: ${classification.source}`,
    "",
    `Ønsket placering: ${application.placement}`,
    `Standstørrelse: ${application.standSize}`,
    `Tidligere deltaget: ${application.previousParticipation}`,
    `Har behov for strøm: ${application.powerNeed}`,
    "",
    "Beskrivelse af produkter og stand:",
    application.description,
    "",
    "Links til billeder eller portfolio:",
    application.assets || "-",
    "",
    "Fødevaredokumentation eller særlige behov:",
    application.compliance || "-",
    "",
    `Regler accepteret: ${application.rulesAccepted ? "Ja" : "Nej"}`,
    `Samtykke til behandling: ${application.privacyAccepted ? "Ja" : "Nej"}`
  ].join("\n");
}

function buildFallbackMailto(application, classification) {
  const subject = `Ny stadeholderansøgning - ${application.companyName}`;
  const body = buildEmailBody(application, classification);

  return `mailto:${emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}
