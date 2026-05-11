import { useEffect, useMemo, useState } from "react";

const routes = {
  home: "/",
  program: "/aarets-program",
  vendors: "/for-stadeholdere"
};

const imageUrls = {
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
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1733136301888-4NOH7KZPVEW6JBXJ8SAQ/Musikskolen.jpg",
  santa:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1733136301399-QG1VJNVKJQY7T8XABZRQ/Julemand2.jpg",
  vendorInfo:
    "https://images.squarespace-cdn.com/content/v1/5bcd900cd86cc941819133c6/1575792496818-0XK9YZZ2N1DXT0AN1TW8/VinogVelsmag+stand2.jpg"
};

const schedule = [
  {
    title: "Begge dage (2025)",
    items: [
      "Besøg Julemanden og de søde nissebørn i det gamle vandtårn. Vi har hørt at han giver slik til alle artige børn.",
      "Besøg Nissemor i Børnenes nisseværksted i den gamle Lade. Her kan I klippe og klistre hele dagen.",
      "Pony ridning i den gamle avlsgård begge dage. Kom og mød de søde ponyer og få en lille ridetur.",
      "Lirekassemanden spreder ægte julestemning i den gamle avlsgård.",
      "Den Gamle Vægter giver guidede ture omkring Engestofte samt Engestofte Kirke. Turene afgår hver hele time kl. 11.00, 12.00 og 13.00 fra indgangen til Restaurant Værkstedet og tager ca. 20 minutter. Pris kr. 30,- pr. pers.",
      "Jule karrusellen kan opleves på plænen ved den gamle vandtårn. Op til 12 år. Pris pr tur kr. 25,-"
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
      "Kl. 10.30: Julemarkedsgudstjeneste i Engestofte Kirke v/ Sognepræst Kenneth Jacobsen.",
      "De tre strygere fra Ensemble Storstrøm spiller ind i søndagens julemarkedsgudstjeneste i Engestofte Kirke.",
      "Kl. 12.00 - 13.30: Guldborgsund Musikskole optræder ved caféen i Loen.",
      "Mad og drikke finder I i Caféen i Loen, Restauranten i Værkstedet, caféen i Kostalden eller den lille café i Laden."
    ]
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
  ["category", "Kategori"],
  ["placement", "Placering"],
  ["previousParticipation", "Tidligere deltagelse"],
  ["powerNeed", "Strøm"]
];

function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function NavLink({ href, children, className = "" }) {
  const isActive = window.location.pathname === href;

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
    <header className="site-header">
      <div className="brand-lockup">
        <p className="eyebrow">Engestofte Gods</p>
        <NavLink href={routes.home} className="brand-name">
          Julemarked 2026
        </NavLink>
      </div>
      <nav className="top-nav" aria-label="Hovednavigation">
        <NavLink href={routes.home}>Julemarked</NavLink>
        <NavLink href={routes.program}>Årets program</NavLink>
        <NavLink href={routes.vendors}>For stadeholdere</NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Kontakt</p>
        <p>Event Direktør Lise Egeskov</p>
        <a href="mailto:le@engestofte.dk">le@engestofte.dk</a>
        <p>Telefon 26 80 61 69</p>
      </div>
      <div>
        <p className="eyebrow">Adresse</p>
        <p>Engestofte Gods</p>
        <p>Søvej 10</p>
        <p>4930 Maribo</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero hero-center">
        <p className="eyebrow">Danmarks hyggeligste julemarked</p>
        <h1>Velkommen til Engestofte Julemarked</h1>
        <p className="hero-date">I år d. 5-6 december 2026</p>
        <p className="hero-kicker">Vi glæder os til at se jer</p>
      </section>

      <section className="image-stage">
        <img
          src={imageUrls.welcome}
          alt="Julestemning ved Engestofte Julemarked"
          className="feature-image"
        />
      </section>

      <section className="content-section intro-copy">
        <h2>Velkommen til Julemarked på Engestofte Gods</h2>
        <p>
          Traditionen tro afholdes der hvert år julemarked på Engestofte Gods. Julemarkedet finder sted
          lørdag og søndag d. 5.-6. december 2026 begge dage fra kl. 10.00.-16.00.
        </p>
        <p>
          Julemarkedet er en af Lolland og Falsters største julebegivenheder, og ikke uden grund. Et væld af
          stader, julemandens værksted, Luciaoptog og meget mere giver en helt særlig magisk julestemning. I
          kan finde årets julegaver blandt et rigt udvalg af brugskunst, dekorationer, keramik, smykker,
          blomster, nisser og alt hvad ens julehjerte ellers kan begære.
        </p>
        <p>
          På Engestofte er der også masser af tilbud til børnene. De kan blandt andet klippe og klistre og
          lege i børnenes eventyrcafe. Børnene kan også komme over og besøge selveste julemanden i det gamle
          vandtårn eller køre med juleekspressen i den gamle avlsgård.
        </p>
      </section>

      <section className="divider" aria-hidden="true" />

      <section className="split-feature">
        <img src={imageUrls.food} alt="Mad og servering på julemarkedet" className="feature-image" />
        <div className="copy-block">
          <h2>Vi elsker julemad</h2>
          <p>
            Traditionen tro, kan du stadig få den legendariske flæskestegssandwich med enten hjemmelavet
            rødkål, mayo og surt eller den med æblesauce og rucola. Herudover lækre toastede sandwich og
            suppe. I kan også prøve restauranten i Værkstedet. Kom over og få konfiteret and med rødkål,
            sovs og kartofler, eller en dejlig Cæsar salat.
          </p>
          <p>
            Vi serverer selvfølgelig også alt det søde der hører julen til; æbleskiver, klejner, kage og
            vores helt egen risalamande med hjemmelavet kirsebærsovs.
          </p>
        </div>
      </section>

      <section className="divider" aria-hidden="true" />

      <section className="story-grid">
        <article className="story-card">
          <img
            src={imageUrls.program}
            alt="Stemningsbillede fra aktiviteter på julemarkedet"
            className="story-image"
          />
          <div className="story-copy">
            <p className="panel-label">Årets program</p>
            <h3>Oplev et væld af stader, levende musik og julemandens værksted</h3>
            <p>
              Programmet for 2026 er endnu ikke helt klart. Herunder kan I gå videre til årets programside
              og få et fuldt overblik over aktiviteterne fra sidste års julemarked.
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
            <h3>Har du en passion for jul og produkter du ønsker at sælge ud af?</h3>
            <p>
              Gå videre til siden for stadeholdere og se den samme information som på Engestoftes nuværende
              side, nu med en direkte digital ansøgningsformular.
            </p>
            <NavLink href={routes.vendors} className="inline-link">
              Læs mere
            </NavLink>
          </div>
        </article>
      </section>

      <section className="divider" aria-hidden="true" />

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
            <p>Entré børn under 12 år: 35 kr. (Denne pris er inkl. barne- eller klapvogn)</p>
            <p>OBS! Grundet de mange stader der sælger fødevarer er det desværre ikke tilladt at have hund med på julemarkedet.</p>
          </div>
          <div>
            <p className="panel-label">Kontakt</p>
            <p>Event Direktør Lise Egeskov</p>
            <p>le@engestofte.dk eller telefon 26 80 61 69</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgramPage() {
  return (
    <main>
      <section className="hero hero-center">
        <p className="eyebrow">Årets program</p>
        <h1>Kom og vær med når vi julehygger på godset</h1>
        <p className="hero-date">I år d. 5-6 december 2026 fra kl. 10 -16</p>
      </section>

      <section className="image-stage">
        <img src={imageUrls.practical} alt="Program og julehygge på Engestofte" className="feature-image" />
      </section>

      <section className="content-section intro-copy">
        <h2>Program for Engestofte julemarked 2026</h2>
        <p>ÅRETS PROGRAM FOR 2026 ER ENDNU IKKE KLAR.</p>
        <p>Herunder kan du få et fuldt overblik over aktiviteterne på sidste års julemarked.</p>
      </section>

      <section className="image-pair">
        <img src={imageUrls.musicSchool} alt="Musikskole på julemarkedet" className="story-image" />
        <img src={imageUrls.santa} alt="Julemand på Engestofte" className="story-image" />
      </section>

      <section className="content-section intro-copy">
        <h3>Programmet for 2026 er endnu ikke helt klart</h3>
        <p>Nedenstående kan I se sidste års program.</p>
        <p>Følg med her på hjemmesiden i takt med at dette års program bliver opdateret.</p>
      </section>

      <section className="content-section program-detail">
        <div className="schedule-grid schedule-grid-soft">
          {schedule.map((group) => (
            <article className="schedule-card schedule-card-soft" key={group.title}>
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

function VendorsPage() {
  const [formData, setFormData] = useState(initialForm);
  const [savedMessage, setSavedMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function saveDraft() {
    window.localStorage.setItem("engestofteVendorDraft", JSON.stringify(formData));
    setSavedMessage("Kladde gemt lokalt");
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.removeItem("engestofteVendorDraft");
    setSavedMessage("");
    setSubmitted(true);
    setFormData(initialForm);
  }

  return (
    <main>
      <section className="hero hero-center">
        <p className="eyebrow">For stadeholdere</p>
        <h1>Velkommen til Engestofte julemarked 2026</h1>
        <p className="hero-date">I år d. 5 - 6 december 2026</p>
      </section>

      <section className="image-stage">
        <img src={imageUrls.vendors} alt="Stadeholdere på Engestofte" className="feature-image" />
      </section>

      <section className="content-section intro-copy">
        <h2>På denne side finder du alle informationer omkring stader til årets julemarked</h2>
        <p>
          Skulle der være information som du ikke kan finde her, så kontakt venligst Lise Egeskov på mail:
          le@engestofte.dk eller Tlf. 26 80 61 69.
        </p>
      </section>

      <section className="divider" aria-hidden="true" />

      <section className="split-feature split-feature-reverse">
        <div className="copy-block">
          <h2>Information til stadeholdere</h2>
          <h3>Liste over stadeholdere</h3>
          <p>På Engestofte har vi stader i følgende steder:</p>
          <p>I Hestestalden, Kostalden, Laden, Værkstedet, samt udendørs i den gamle avlsgård.</p>
          <p>Tid og sted: Julemarkedet finder sted på Engestofte Gods, Søvej 10, 4930 Maribo.</p>
          <p>Dato: 5. - 6. december 2026 fra kl. 10 - 16.</p>
          <h3>Stadeholderne</h3>
          <p>
            Vi håber at dette års julemarked bliver en succes for alle og takker de stadeholdere der allerede
            har meldt sig til. Vi vil gøre hvad vi kan for at give jer en god oplevelse.
          </p>
        </div>
        <img src={imageUrls.vendorInfo} alt="Information til stadeholdere" className="feature-image" />
      </section>

      <section className="content-section intro-copy">
        <h3>Tilmelding</h3>
        <p>
          Hvis I ønsker at få en stand til dette års julemarked på Engestofte bedes I indsende et
          ansøgningskema.
        </p>
        <h3>Ansøgningsfrist</h3>
        <p>
          Ansøgningsfrist for deltagelse til julemarkedet er torsdag d. 3. december 2026. Det kan betale sig
          at ansøge i god tid for at have størst chance for at få en plads.
        </p>
        <h3>Ud fra hvilke kriterier udvælges stadeholdere?</h3>
        <p>Tilknytning: Vi vægter de stadeholdere højest der har været med ved tidligere arrangementer på Engestofte.</p>
        <p>Kvalitet: Vi vægter de stader højest, der sælger varer af højeste kvalitet.</p>
        <p>Først til mølle: Vi udvælger stader løbende og de stadeholdere der melder sig til først har derfor størst chance for at blive udvalgt.</p>
        <p>Originalitet: Vi vægter de stader højest, der har et sortiment, der skiller sig ud fra det eksisterende udvalg.</p>
        <h3>Udsmykning og skiltning</h3>
        <p>
          Vi ønsker at præsentere et smukt, sammenhængende og indbydende arrangement for publikum. Derfor
          har vi udstukket nogle regler for udsmykning af stader og telte.
        </p>
        <p>
          Duge skal holdes i neutrale farver såsom sand, hvid, sort eller tern. Nervøs velour og nylon
          frabedes. Roll-up bannere, flag, reoler og lignende højere end 1,5 meter må som udgangspunkt kun
          stå op ad en væg.
        </p>
        <h3>Telte</h3>
        <p>
          Vi henstiller til at udendørs stadetelte holdes i ensfarvede neutrale farver. Stadeholdere har det
          fulde ansvar for at deres telte er forsvarligt fæstnede.
        </p>
        <h3>Sikkerhed og regler</h3>
        <p>
          Når I lejer en stadeplads forpligter I jer samtidig til at overholde de krav der bliver stillet af
          arrangørerne samt myndighederne som f.eks. SKAT og Fødevarestyrelsen.
        </p>
      </section>

      <section className="application-shell">
        <div className="section-heading">
          <p className="eyebrow">Ansøgningsformular</p>
          <h2>Indsend ansøgningskema</h2>
          <p>Her kan stadeholdere ansøge direkte i stedet for at sende frem og tilbage over mail.</p>
        </div>

        <div className="application-layout">
          <form className="application-form" onSubmit={handleSubmit}>
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
              <label>
                Hjemmeside / SoMe
                <input type="url" name="website" value={formData.website} onChange={updateField} />
              </label>
              <label>
                Kategori
                <select name="category" value={formData.category} onChange={updateField} required>
                  <option value="">Vælg kategori</option>
                  <option value="Smykker">Smykker</option>
                  <option value="Keramik">Keramik</option>
                  <option value="Brugskunst">Brugskunst</option>
                  <option value="Mad og drikke">Mad og drikke</option>
                  <option value="Dekorationer">Dekorationer</option>
                  <option value="Børn og aktiviteter">Børn og aktiviteter</option>
                  <option value="Tekstiler">Tekstiler</option>
                  <option value="Andet">Andet</option>
                </select>
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
                <select name="previousParticipation" value={formData.previousParticipation} onChange={updateField} required>
                  <option value="">Vælg</option>
                  <option value="Ja, flere gange">Ja, flere gange</option>
                  <option value="Ja, én gang">Ja, én gang</option>
                  <option value="Nej, første gang">Nej, første gang</option>
                </select>
              </label>
              <label>
                Har I behov for strøm?
                <select name="powerNeed" value={formData.powerNeed} onChange={updateField} required>
                  <option value="">Vælg</option>
                  <option value="Ja">Ja</option>
                  <option value="Nej">Nej</option>
                </select>
              </label>
              <label className="full-width">
                Beskrivelse af produkter og stand
                <textarea name="description" value={formData.description} onChange={updateField} rows="5" required />
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

            <div className="checkbox-group">
              <label className="checkbox-row">
                <input type="checkbox" name="rulesAccepted" checked={formData.rulesAccepted} onChange={updateField} required />
                Jeg accepterer regler om udsmykning, sikkerhed og fri passage på gangarealer.
              </label>
              <label className="checkbox-row">
                <input type="checkbox" name="privacyAccepted" checked={formData.privacyAccepted} onChange={updateField} required />
                Jeg accepterer, at Engestofte gemmer mine oplysninger med henblik på behandling af ansøgningen.
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Send ansøgning
              </button>
              <button type="button" className="button button-secondary" onClick={saveDraft}>
                Gem kladde
              </button>
            </div>

            {savedMessage ? <p className="inline-message">{savedMessage}</p> : null}
          </form>

          <aside className="application-sidebar">
            <div className="sidebar-card">
              <p className="panel-label">Ansøgningsoversigt</p>
              <h3>Det her ser Lise først</h3>
              <dl className="preview-list">
                {previewValues.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {submitted ? (
              <div className="sidebar-card success-card">
                <p className="panel-label">Kvittering</p>
                <h3>Ansøgningen er registreret</h3>
                <p>Tak for jeres ansøgning til Engestofte Julemarked. Vi vender tilbage, når ansøgningen er behandlet.</p>
              </div>
            ) : null}
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
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  let page = <HomePage />;

  if (pathname === routes.program) {
    page = <ProgramPage />;
  } else if (pathname === routes.vendors) {
    page = <VendorsPage />;
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
