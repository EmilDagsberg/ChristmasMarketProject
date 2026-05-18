import { useEffect, useMemo, useState } from "react";

const routes = {
  home: "/da/julemarked",
  program: "/da/aarets-program",
  vendors: "/da/for-stadeholdere"
};

const routeAliases = {
  home: ["/", routes.home],
  program: ["/aarets-program", routes.program],
  vendors: ["/for-stadeholdere", routes.vendors]
};

const heroLinks = [
  { label: "Julemarked", href: routes.home, type: "internal" },
  { label: "Årets program", href: routes.program, type: "internal" },
  { label: "For stadeholdere", href: routes.vendors, type: "internal" },
  { label: "Om Engestofte", href: "https://www.engestofte.com/", type: "external" }
];

const languageLinks = [
  { label: "DA", href: "https://www.engestofte.com/da/julemarked" },
  { label: "EN", href: "https://www.engestofte.com/en/christmas-market" },
  { label: "DE", href: "https://www.engestofte.com/de/weihnachtsmarkt" }
];

const imageUrls = {
  logo:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1553680645240-NJP9IWWHOOJRNKKJA8CL/engestofte-gods-logo-white.png",
  welcome:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1542365378300-7XHY1641XD5RDD4AQ1C9/_MG_4958.JPG",
  food:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1574681914631-710OQD3TU061JJCT3JA7/gris.jpg",
  program:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1551710342599-00Z6MPJT59WZVIPDY9H9/kp0mp9XA.jpg",
  vendors:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1551710017490-YT2FMQYZQ3OCVVEHHZ24/Blomsterb%25C3%25B8rn%2Bstand.jpg",
  practical:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1542799207863-FFC3SM10EQNUXOMSC2QM/smagspr%C3%B8ver.jpg",
  musicSchool:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Choir%2C_Bloor_Street_Christmas_market_2025.jpg",
  santa:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Christmas_Candles_4890632158.jpg",
  vendorInfo:
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Market_stall_in_Strasbourg.jpg"
};

const contactDetails = {
  name: "Emil Dagsberg",
  email: "emildagsberg@hotmail.dk",
  addressLines: ["Engestofte Gods", "Søvej 10", "4930 Maribo"]
};

const schedule = [
  {
    title: "Begge dage (2025)",
    items: [
      "Besøg Julemanden og de søde nissebørn i det gamle vandtårn. Vi har hørt at han giver slik til alle artige børn.",
      "Besøg Nissemor i Børnenes nisseværksted i den gamle Lade. Her kan I klippe og klistre hele dagen.",
      "Ponyridning i den gamle avlsgård begge dage. Kom og mød de søde ponyer og få en lille ridetur.",
      "Lirekassemanden spreder ægte julestemning i den gamle avlsgård.",
      "Den Gamle Vægter giver guidede ture omkring Engestofte samt Engestofte Kirke. Turene afgår hver hele time kl. 11.00, 12.00 og 13.00 fra indgangen til Restaurant Værkstedet og tager ca. 20 minutter. Pris kr. 30,- pr. pers.",
      "Julekarrusellen kan opleves på plænen ved det gamle vandtårn. Op til 12 år. Pris pr. tur kr. 25,-."
    ]
  },
  {
    title: "Lørdag (2025)",
    items: [
      "Kl. 10.00 - 10.30: Morgensang med Det Hvide Kor ved indgangen til julemarkedet. Ved dårligt vejr flyttes morgensang til caféen i Kostalden.",
      "Kl. 11.30 - 13.15: Jazzduoen Nielsen & Strømsholt skaber julestemning med varme klassikere fortolket på guitar og kontrabas.",
      "Kl. ca. 13.30: Luciaoptog med børnene fra Sankt Birgitta Skole gennem de gamle avlsbygninger.",
      "Kl. 14.00 - 15.00: Det Hvide Kor synger for os alle i den gamle Lo."
    ]
  },
  {
    title: "Søndag (2025)",
    items: [
      "Kl. 10.30: Julemarkedsgudstjeneste i Engestofte Kirke v/ sognepræst Kenneth Jacobsen.",
      "De tre strygere fra Ensemble Storstrøm spiller ind i søndagens julemarkedsgudstjeneste i Engestofte Kirke.",
      "Kl. 12.00 - 13.30: Guldborgsund Musikskole optræder ved caféen i Loen.",
      "Mad og drikke finder I i caféen i Loen, restauranten i Værkstedet, caféen i Kostalden eller den lille café i Laden."
    ]
  }
];

const applicationSteps = [
  {
    title: "1. Udfyld ansøgningen",
    text: "Virksomheden sender oplysninger, billeder og praktiske behov samlet ét sted."
  },
  {
    title: "2. Gennemgang hos Emil",
    text: "Ansøgningen sendes automatisk som e-mail og kan samtidig få en AI-forslået kategori og tags."
  },
  {
    title: "3. Brug kategorien videre",
    text: "Den samme kategori kan bruges senere til filtre på stadeholderliste, kort og besøgersøgning."
  }
];

const initialForm = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  category: "",
  placement: "",
  standSize: "",
  previousParticipation: "",
  powerNeed: "",
  description: "",
  assets: "",
  compliance: "",
  rulesAccepted: false,
  privacyAccepted: false
};

const previewFields = [
  ["companyName", "Virksomhed"],
  ["contactName", "Kontaktperson"],
  ["category", "Egen kategori"],
  ["placement", "Placering"],
  ["previousParticipation", "Tidligere deltagelse"],
  ["powerNeed", "Strøm"]
];

function isRouteActive(target, pathname) {
  return Object.entries(routes).some(([key, value]) => {
    if (value !== target) {
      return false;
    }

    return routeAliases[key].includes(pathname);
  });
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function NavLink({ href, children, className = "" }) {
  const isActive = isRouteActive(href, window.location.pathname);

  function handleClick(event) {
    event.preventDefault();
    navigateTo(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? "is-active" : ""}`.trim()}
    >
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <NavLink href={routes.home} className="logo-link">
          <img src={imageUrls.logo} alt="Engestofte Gods" className="logo-image" />
        </NavLink>

        <div className="masthead-actions">
          <a
            href="https://vaerkstedet-engestofte.dk"
            target="_blank"
            rel="noreferrer"
            className="masthead-button"
          >
            Restaurant Værkstedet
          </a>
          <a href={`mailto:${contactDetails.email}`} className="masthead-button">
            Kontakt
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroBanner({ image, title, date, kicker }) {
  return (
    <section className="hero-banner" style={{ "--hero-image": `url(${image})` }}>
      <div className="hero-banner-scrim" />
      <div className="hero-banner-inner">
        <div className="hero-banner-top">
          <nav className="hero-nav" aria-label="Julemarkedsnavigation">
            {heroLinks.map((link) =>
              link.type === "internal" ? (
                <NavLink href={link.href} key={link.label}>
                  {link.label}
                </NavLink>
              ) : (
                <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="language-switch" aria-label="Sprogvalg">
            {languageLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-copy">
          <h1>{title}</h1>
          <p className="hero-date">{date}</p>
          {kicker ? <p className="hero-kicker">{kicker}</p> : null}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="kontakt">
      <div>
        <p className="eyebrow">Kontakt</p>
        <p className="footer-heading">{contactDetails.name}</p>
        <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
        <p className="footer-note">Demo-kontakt til test af stadeholderflowet.</p>
      </div>

      <div>
        <p className="eyebrow">Adresse</p>
        <p className="footer-heading">{contactDetails.addressLines[0]}</p>
        <p>{contactDetails.addressLines[1]}</p>
        <p>{contactDetails.addressLines[2]}</p>
      </div>
    </footer>
  );
}

function SectionDivider() {
  return <section className="divider" aria-hidden="true" />;
}

function HomePage() {
  return (
    <main>
      <HeroBanner
        image={imageUrls.welcome}
        title={
          <>
            <span>Danmarks hyggeligste</span>
            <span>julemarked</span>
          </>
        }
        date="I år d. 5-6 december 2026!"
        kicker="Vi glæder os til at se jer!"
      />

      <section className="content-section intro-section">
        <h2>Velkommen til Julemarked på Engestofte Gods</h2>
        <p>
          Traditionen tro afholdes der hvert år julemarked på Engestofte Gods. Julemarkedet finder
          sted lørdag og søndag d. 5.-6. december 2026 begge dage fra kl. 10.00-16.00.
        </p>
        <p>
          Julemarkedet er en af Lolland og Falsters største julebegivenheder, og ikke uden grund.
          Et væld af stader, julemandens værksted, Luciaoptog og meget mere giver en helt særlig
          magisk julestemning. I kan finde årets julegaver blandt et rigt udvalg af brugskunst,
          dekorationer, keramik, smykker, blomster, nisser og alt hvad ens julehjerte ellers kan
          begære.
        </p>
        <p>
          På Engestofte er der også masser af tilbud til børnene. De kan blandt andet klippe og
          klistre og lege i børnenes eventyrcafé. Børnene kan også komme over og besøge selveste
          julemanden i det gamle vandtårn eller køre med juleekspressen i den gamle avlsgård.
        </p>
      </section>

      <SectionDivider />

      <section className="split-section">
        <img src={imageUrls.food} alt="Mad og servering på julemarkedet" className="feature-image" />
        <div className="copy-panel">
          <h2>Vi elsker julemad</h2>
          <p>
            Traditionen tro kan du stadig få den legendariske flæskestegssandwich med enten
            hjemmelavet rødkål, mayo og surt eller den med æblesauce og rucola. Herudover lækre
            toastede sandwich og suppe. I kan også prøve restauranten i Værkstedet.
          </p>
          <p>
            Kom over og få konfiteret and med rødkål, sovs og kartofler, eller en dejlig Cæsar
            salat. Vi serverer selvfølgelig også alt det søde der hører julen til: æbleskiver,
            klejner, kage og vores helt egen risalamande med hjemmelavet kirsebærsovs.
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="story-grid">
        <article className="story-card">
          <img
            src={imageUrls.program}
            alt="Stemningsbillede fra aktiviteter på julemarkedet"
            className="story-image"
          />
          <div className="story-copy">
            <p className="panel-label">Årets program</p>
            <h3>Oplev musik, guidede ture, julemandens værksted og masser af julestemning</h3>
            <p>
              Programmet for 2026 er endnu ikke helt klart. På programsiden kan I se sidste års
              indhold og få en fornemmelse af, hvad julemarkedet rummer.
            </p>
            <NavLink href={routes.program} className="inline-link">
              Læs mere
            </NavLink>
          </div>
        </article>

        <article className="story-card">
          <img src={imageUrls.vendors} alt="Stade på Engestofte Julemarked" className="story-image" />
          <div className="story-copy">
            <p className="panel-label">For stadeholdere</p>
            <h3>Den nuværende side er bevaret, men med digital ansøgning lagt ovenpå</h3>
            <p>
              Her viser demoen, hvordan Engestoftes eksisterende stadeholderinformation kan kombineres
              med en direkte formular, så virksomheder slipper for den manuelle mailrunde.
            </p>
            <NavLink href={routes.vendors} className="inline-link">
              Gå til siden
            </NavLink>
          </div>
        </article>
      </section>

      <SectionDivider />

      <section className="content-section soft-panel">
        <p className="eyebrow">Stadeholderliste 2026</p>
        <h2>Listen er endnu ikke klar</h2>
        <p>
          På den rigtige side linker Engestofte til sidste års stadeholderliste, indtil årets
          udgave er klar. I demoen er fokus i stedet lagt på at gøre vejen ind for nye virksomheder
          hurtigere og mere overskuelig.
        </p>
      </section>

      <SectionDivider />

      <section className="content-section practical-section">
        <h2>Praktisk information</h2>
        <img
          src={imageUrls.practical}
          alt="Smagsprøver og praktisk stemning fra julemarkedet"
          className="feature-image"
        />

        <div className="practical-grid">
          <div>
            <p className="panel-label">Priser & praktisk</p>
            <p>Entré pr. pers. over 12 år: 75 kr.</p>
            <p>Entré børn under 12 år: 35 kr. (denne pris er inkl. barne- eller klapvogn).</p>
            <p>
              OBS! Grundet de mange stader der sælger fødevarer er det desværre ikke tilladt at have
              hund med på julemarkedet.
            </p>
          </div>

          <div>
            <p className="panel-label">Kontakt</p>
            <p>{contactDetails.name}</p>
            <p>{contactDetails.email}</p>
            <p>{contactDetails.addressLines.join(", ")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgramPage() {
  return (
    <main>
      <HeroBanner
        image={imageUrls.practical}
        title={
          <>
            <span>Kom og vær med når vi</span>
            <span>julehygger på godset</span>
          </>
        }
        date="I år d. 5-6 december 2026 fra kl. 10-16!"
      />

      <section className="content-section intro-section">
        <h2>Program for Engestofte julemarked 2026</h2>
        <p>ÅRETS PROGRAM FOR 2026 ER ENDNU IKKE KLAR.</p>
        <p>Herunder kan du få et fuldt overblik over aktiviteterne på sidste års julemarked.</p>
      </section>

      <section className="image-pair">
        <img src={imageUrls.musicSchool} alt="Musikskole på julemarkedet" className="story-image" />
        <img src={imageUrls.santa} alt="Julemand på Engestofte" className="story-image" />
      </section>

      <section className="content-section intro-section">
        <h3>Programmet for 2026 er endnu ikke helt klart</h3>
        <p>Nedenstående kan I se sidste års program.</p>
        <p>Følg med her på hjemmesiden i takt med at dette års program bliver opdateret.</p>
      </section>

      <section className="content-section schedule-section">
        <div className="schedule-grid">
          {schedule.map((group) => (
            <article className="schedule-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ApplicationResult({ result }) {
  if (!result) {
    return null;
  }

  const emailWasSent = result.email?.sent;
  const classification = result.classification;

  return (
    <div className="sidebar-card success-card">
      <p className="panel-label">Kvittering</p>
      <h3>{emailWasSent ? "Ansøgningen er sendt" : "Ansøgningen er modtaget"}</h3>
      <p>{result.message}</p>

      {classification ? (
        <div className="result-block">
          <p className="panel-label">AI-kategorisering</p>
          <p className="result-primary">{classification.primaryCategory}</p>
          <p>{classification.reasoning}</p>
          {classification.tags?.length ? (
            <div className="tag-list">
              {classification.tags.map((tag) => (
                <span className="tag-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {result.email?.fallbackDraft ? (
        <a className="inline-link" href={result.email.fallbackDraft}>
          Åbn fallback-mail
        </a>
      ) : null}
    </div>
  );
}

function VendorsPage() {
  const [formData, setFormData] = useState(initialForm);
  const [savedMessage, setSavedMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const draft = window.localStorage.getItem("engestofteVendorDraft");

    if (!draft) {
      return;
    }

    try {
      setFormData({ ...initialForm, ...JSON.parse(draft) });
    } catch {
      window.localStorage.removeItem("engestofteVendorDraft");
    }
  }, []);

  const previewValues = useMemo(
    () =>
      previewFields.map(([key, label]) => ({
        label,
        value: formData[key] || "Ikke udfyldt endnu"
      })),
    [formData]
  );

  function updateField(event) {
    const { name, type, checked, value } = event.target;
    setSubmitted(false);
    setSavedMessage("");
    setSubmitError("");
    setSubmissionResult(null);
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function saveDraft() {
    window.localStorage.setItem("engestofteVendorDraft", JSON.stringify(formData));
    setSavedMessage("Kladde gemt lokalt på enheden");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSavedMessage("");
    setSubmissionResult(null);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Der opstod en fejl under indsendelsen.");
      }

      window.localStorage.removeItem("engestofteVendorDraft");
      setSubmitted(true);
      setSubmissionResult(payload);
      setFormData(initialForm);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Der opstod en fejl under indsendelsen. Prøv igen."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <HeroBanner
        image={imageUrls.vendors}
        title={
          <>
            <span>Velkommen til</span>
            <span>Engestofte julemarked 2026</span>
          </>
        }
        date="I år d. 5-6 december 2026!"
      />

      <section className="content-section intro-section">
        <h2>På denne side finder du alle informationer omkring stader til årets julemarked</h2>
        <p>
          Skulle der være information som du ikke kan finde her, så kontakt venligst{" "}
          {contactDetails.name} på mail: {contactDetails.email}.
        </p>
      </section>

      <SectionDivider />

      <section className="split-section split-section-reverse">
        <div className="copy-panel">
          <p className="eyebrow">Information til stadeholdere</p>
          <h2>Den eksisterende Engestofte-side, nu med digital ansøgning</h2>
          <h3>Liste over stadeholdere</h3>
          <p>På Engestofte har vi stader i følgende steder:</p>
          <p>I Hestestalden, Kostalden, Laden, Værkstedet samt udendørs i den gamle avlsgård.</p>
          <p>Tid og sted: Julemarkedet finder sted på Engestofte Gods, Søvej 10, 4930 Maribo.</p>
          <p>Dato: 5.-6. december 2026 fra kl. 10-16.</p>
          <h3>Stadeholderne</h3>
          <p>
            Vi håber at dette års julemarked bliver en succes for alle og takker de stadeholdere der
            allerede har meldt sig til. Vi vil gøre hvad vi kan for at give jer en god oplevelse.
          </p>
        </div>

        <img src={imageUrls.vendorInfo} alt="Information til stadeholdere" className="feature-image" />
      </section>

      <section className="content-section vendor-details">
        <h3>Tilmelding</h3>
        <p>
          Hvis I ønsker at få en stand til dette års julemarked på Engestofte bedes I indsende et
          ansøgningsskema. I denne version sendes det til en backend, som forsøger at sende
          ansøgningen videre som e-mail og samtidig foreslår en besøgsvenlig kategori.
        </p>

        <h3>Ansøgningsfrist</h3>
        <p>
          Ansøgningsfrist for deltagelse til julemarkedet er torsdag d. 3. december 2026. Det kan
          betale sig at ansøge i god tid for at have størst chance for at få en plads.
        </p>

        <h3>Ud fra hvilke kriterier udvælges stadeholdere?</h3>
        <p>
          <strong>Tilknytning:</strong> Vi vægter de stadeholdere højest der har været med ved
          tidligere arrangementer på Engestofte.
        </p>
        <p>
          <strong>Kvalitet:</strong> Vi vægter de stader højest, der sælger varer af højeste
          kvalitet.
        </p>
        <p>
          <strong>Først til mølle:</strong> Vi udvælger stader løbende og de stadeholdere der melder
          sig til først har derfor størst chance for at blive udvalgt.
        </p>
        <p>
          <strong>Originalitet:</strong> Vi vægter de stader højest, der har et sortiment, der
          skiller sig ud fra det eksisterende udvalg.
        </p>

        <h3>Udsmykning og skiltning</h3>
        <p>
          Vi ønsker at præsentere et smukt, sammenhængende og indbydende arrangement for publikum.
          Derfor har vi udstukket nogle regler for udsmykning af stader og telte.
        </p>
        <p>
          Duge skal holdes i neutrale farver såsom sand, hvid, sort eller tern. Nervøs velour og
          nylon frabedes. Roll-up bannere, flag, reoler og lignende højere end 1,5 meter må som
          udgangspunkt kun stå op ad en væg. Af brandsikkerhedsmæssige grunde må gangarealer ikke
          fyldes op.
        </p>

        <h3>Telte</h3>
        <p>
          Vi henstiller til at udendørs stadetelte holdes i ensfarvede neutrale farver.
          Stadeholdere har det fulde ansvar for at deres telte er forsvarligt fæstnede.
        </p>

        <h3>Sikkerhed og regler</h3>
        <p>
          Når I lejer en stadeplads forpligter I jer samtidig til at overholde de krav der bliver
          stillet af arrangørerne samt myndighederne som f.eks. SKAT og Fødevarestyrelsen.
        </p>
        <p>
          Husk at medbringe alle lovpligtige tilladelser og/eller dokumentation, så den kan
          forevises myndighederne i tilfælde af inspektion. Læs mere hos{" "}
          <a href="https://www.foedevarestyrelsen.dk" target="_blank" rel="noreferrer">
            Fødevarestyrelsen
          </a>{" "}
          og{" "}
          <a href="https://www.skat.dk" target="_blank" rel="noreferrer">
            SKAT
          </a>
          .
        </p>
      </section>

      <SectionDivider />

      <section className="content-section process-panel">
        <div className="section-heading">
          <p className="eyebrow">Demo-tilføjelse</p>
          <h2>Sådan forbedrer formularen den nuværende proces</h2>
          <p>
            Ideen er at bevare Engestoftes nuværende informationsside næsten som den er, men gøre
            første kontakt med nye virksomheder langt mindre manuel.
          </p>
          <p>
            I denne version forsøger systemet at sende ansøgningen automatisk til{" "}
            {contactDetails.email}. Samtidig bruges AI til at foreslå en bred kategori og tags, som
            senere kan bruges på besøgersiderne.
          </p>
        </div>

        <div className="step-grid">
          {applicationSteps.map((step) => (
            <article className="step-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="application-shell" id="ansogning">
        <div className="section-heading">
          <p className="eyebrow">Ansøgningsformular</p>
          <h2>Indsend ansøgningsskema direkte på siden</h2>
          <p>
            Formularen er tænkt som første skridt mod en selvbetjent onboarding, hvor nye og
            tilbagevendende virksomheder kan sende alle relevante oplysninger samlet ét sted.
          </p>
        </div>

        <div className="application-layout">
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Virksomhed og kontakt</h3>
              <div className="field-grid">
                <label>
                  Firmanavn
                  <input type="text" name="companyName" value={formData.companyName} onChange={updateField} required />
                </label>
                <label>
                  Kontaktperson
                  <input type="text" name="contactName" value={formData.contactName} onChange={updateField} required />
                </label>
                <label>
                  E-mail
                  <input type="email" name="email" value={formData.email} onChange={updateField} required />
                </label>
                <label>
                  Telefon
                  <input type="tel" name="phone" value={formData.phone} onChange={updateField} required />
                </label>
                <label className="full-width">
                  Hjemmeside / SoMe
                  <input type="url" name="website" value={formData.website} onChange={updateField} />
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Stand og sortiment</h3>
              <div className="field-grid">
                <label>
                  Egen kategori (valgfri)
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={updateField}
                    placeholder="Fx honning, delikatesser, illustrationer eller keramik"
                  />
                </label>

                <label>
                  Ønsket placering
                  <select name="placement" value={formData.placement} onChange={updateField} required>
                    <option value="">Vælg placering</option>
                    <option value="Indendørs">Indendørs</option>
                    <option value="Udendørs">Udendørs</option>
                    <option value="Ingen præference">Ingen præference</option>
                  </select>
                </label>

                <label>
                  Standstørrelse
                  <select name="standSize" value={formData.standSize} onChange={updateField} required>
                    <option value="">Vælg størrelse</option>
                    <option value="Lille stand">Lille stand</option>
                    <option value="Mellem stand">Mellem stand</option>
                    <option value="Stor stand">Stor stand</option>
                    <option value="Centerstand">Centerstand</option>
                  </select>
                </label>

                <label>
                  Tidligere deltaget?
                  <select
                    name="previousParticipation"
                    value={formData.previousParticipation}
                    onChange={updateField}
                    required
                  >
                    <option value="">Vælg</option>
                    <option value="Ja, flere gange">Ja, flere gange</option>
                    <option value="Ja, én gang">Ja, én gang</option>
                    <option value="Nej, første gang">Nej, første gang</option>
                  </select>
                </label>

                <label className="full-width">
                  Beskrivelse af produkter og stand
                  <textarea name="description" value={formData.description} onChange={updateField} rows="5" required />
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Praktiske oplysninger</h3>
              <div className="field-grid">
                <label>
                  Har I behov for strøm?
                  <select name="powerNeed" value={formData.powerNeed} onChange={updateField} required>
                    <option value="">Vælg</option>
                    <option value="Ja">Ja</option>
                    <option value="Nej">Nej</option>
                  </select>
                </label>

                <label className="full-width">
                  Links til billeder eller portfolio
                  <textarea name="assets" value={formData.assets} onChange={updateField} rows="3" />
                </label>

                <label className="full-width">
                  Fødevaredokumentation eller særlige behov
                  <textarea name="compliance" value={formData.compliance} onChange={updateField} rows="3" />
                </label>
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-row">
                <input type="checkbox" name="rulesAccepted" checked={formData.rulesAccepted} onChange={updateField} required />
                Jeg accepterer regler om udsmykning, sikkerhed og fri passage på gangarealer.
              </label>

              <label className="checkbox-row">
                <input type="checkbox" name="privacyAccepted" checked={formData.privacyAccepted} onChange={updateField} required />
                Jeg accepterer, at oplysningerne behandles med henblik på vurdering af ansøgningen.
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sender..." : "Send ansøgning"}
              </button>
              <button type="button" className="button button-secondary" onClick={saveDraft} disabled={isSubmitting}>
                Gem kladde
              </button>
            </div>

            {savedMessage ? <p className="inline-message">{savedMessage}</p> : null}
            {submitError ? <p className="form-status form-status-error">{submitError}</p> : null}
          </form>

          <aside className="application-sidebar">
            <div className="sidebar-card">
              <p className="panel-label">Ansøgningsoversigt</p>
              <h3>Det her ser Emil først</h3>
              <dl className="preview-list">
                {previewValues.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="sidebar-card">
              <p className="panel-label">AI i denne del</p>
              <h3>Kategorisering uden faste felter</h3>
              <p>
                AI læser virksomhedens beskrivelse og foreslår en bred besøgerkategori som fx Mad,
                Drikke, Keramik, Smykker eller Børn & aktiviteter.
              </p>
              <p>
                Det gør det lettere at finde stands senere, uden at Lise behøver at opfinde nye
                felter hver gang der kommer en anderledes virksomhed.
              </p>
            </div>

            <div className="sidebar-card">
              <p className="panel-label">Kontakt</p>
              <h3>Testkontakt i demoen</h3>
              <p>{contactDetails.name}</p>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              <p>Adresse beholdes som {contactDetails.addressLines.join(", ")}.</p>
            </div>

            {submitted ? <ApplicationResult result={submissionResult} /> : null}
          </aside>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function onPopState() {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  let page = <HomePage />;

  if (routeAliases.program.includes(pathname)) {
    page = <ProgramPage />;
  } else if (routeAliases.vendors.includes(pathname)) {
    page = <VendorsPage />;
  } else if (!routeAliases.home.includes(pathname)) {
    page = <HomePage />;
  }

  return (
    <div className="page-shell">
      <Header />
      {page}
      <Footer />
    </div>
  );
}

export default App;
