# ChristmasMarketProject

## Environment Setup

This project uses three different places for configuration:

### 1. Local development: `.env`

Create a local `.env` file in the project root.
This file contains your real secrets and must never be committed.

Example local variables:

```env
PORT=8787
APPLICATION_EMAIL_TO=your_destination_email@example.com

OPENAI_API_KEY=your_real_openai_api_key
OPENAI_MODEL=gpt-5.5

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your_real_sendgrid_api_key
SMTP_FROM=your_verified_sender@example.com
```

### 2. Repository template: `.env.example`

Use `.env.example` as the safe template that can be committed to GitHub.
It should only contain placeholder values, never real keys.

### 3. GitHub Secrets

If the project is later deployed through GitHub Actions, Vercel, Render, Railway, or another CI/CD flow, store secrets in GitHub repository secrets.

Recommended GitHub secret names:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `APPLICATION_EMAIL_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

### Rules

- `.env` stays local only
- `.env.example` is committed
- GitHub Secrets are used for deployment or CI
- never paste real keys into source files, README, or commits
- if a key was ever committed, rotate it immediately

### Local run

From the project folder, run:

```powershell
npm run server
```

In a second terminal:

```powershell
npm run dev
```
Projektets arbejdstitel: Thor og Emils Julemarkeds løsning.

Problem:
Hvilket konkret problem løser vi?
Engestofte Gods’ julemarked har en manuel og sårbar proces omkring stadeholdere. I dag skal interesserede stadeholdere kontakte Lise via mail for at få et ansøgningsskema, hvorefter information skal sendes frem og tilbage, dobbelttjekkes og sandsynligvis kopieres ind i interne lister.
Det skaber problemer med:
•	mange mails 
•	copy/paste-arbejde 
•	risiko for fejl i oplysninger 
•	manglende overblik over ansøgninger 
•	sårbarhed, fordi meget viden ligger hos én person 
•	svært at genbruge data fra tidligere år 
•	svært at søge, filtrere og evaluere stadeholdere systematisk 
Det konkrete problem vi løser er derfor:
Hvordan kan Engestofte gøre tilmelding, behandling og overblik over stadeholdere mere struktureret, mindre manuelt og lettere at genbruge fra år til år?


Bruger:
Hvem er den primære bruger?
Lise / eventansvarlig hos Engestofte Gods
Hun skal kunne modtage, vurdere og administrere ansøgninger fra stadeholdere.
Sekundære brugere er:
Stadeholdere, som ønsker at ansøge om en stand til julemarkedet.
Eventuelt senere:
Besøgende, hvis løsningen udvides med offentlig stadeholderliste, kort eller chatbot.


Nuværende proces:
Hvordan foregår det i dag?
1.  En stadeholder besøger siden “For stadeholdere”. 
2.  De læser praktisk information om sted, dato, regler, kriterier og standområder. 
3.  Hvis de vil ansøge, skal de kontakte Lise via mail for at få et ansøgningsskema. 
4.  Ansøgningsskemaet sendes sandsynligvis frem og tilbage via mail. 
5.  Lise skal manuelt gennemgå ansøgninger. 
6.  Hun vurderer dem efter kriterier som tilknytning, kvalitet, først til mølle, originalitet og sortimentsbredde. 
6.  Stadeholderlisten bliver senere offentliggjort på hjemmesiden.
Efter et julemarked, så sender Lise manuelt mails til tidligere stadeholdere, for at hører om de vil være med i år. Hvis der er nej, skal hun manuelt på udkig efter andre virksomheder, som kan tage deres plads. 
Besøgende har en liste over stadeholdere og en liste af events, der sker og hvornår de sker. 

Foreslået løsning:
Hvad bygger vi?
Vi bygger en digital julemarkedsplatform med en intern og en offentlig del.
1. Standholderportal
Stadeholdere kan ansøge direkte via en formular i stedet for først at skrive til Lise for at få et skema.
Formularen samler oplysninger som:
•	navn på standholder/virksomhed 
•	kontaktoplysninger 
•	produktbeskrivelse 
•	kategori 
•	tidligere deltagelse 
•	behov for strøm 
•	ønske om indendørs/udendørs placering 
•	billeder eller links 
•	accept af regler 
•	dokumentation ved mad/fødevarer 
2. Admin-dashboard til Lise
Lise kan se alle ansøgninger samlet ét sted.
Hun kan:
•	se nye ansøgninger 
•	filtrere på kategori, status og behov 
•	godkende eller afvise ansøgninger 
•	skrive interne noter 
•	se AI-opsummering 
•	se om der mangler information 
•	vælge hvilke godkendte stande der skal vises på kortet 
3. Email automation
Systemet hjælper Lise med de gentagne mails.
Det kan for eksempel bruges til:
•	automatisk kvittering når en standholder ansøger 
•	mailudkast hvis ansøgningen mangler information 
•	godkendelsesmail 
•	afvisningsmail 
•	praktisk informationsmail før julemarkedet 
•	reminder om dokumentation, opsætning eller regler 
•	besked når stadeholderlisten/live map er offentlig 
Vigtigt: I MVP’en kan mails være genererede mailudkast, som Lise selv godkender, i stedet for at systemet sender alt automatisk. Det gør løsningen mere realistisk og mindre risikabel.
Eksempel:
En standholder ansøger om en madbod, men mangler dokumentation. Systemet markerer “mangler fødevaredokumentation” og foreslår en mail, som Lise kan sende.
4. Live map
Når en standholder er godkendt, kan Lise placere standen på et simpelt kort.
Besøgende kan bruge kortet til at finde:
•	stande 
•	madområder 
•	aktiviteter 
•	julemandens værksted 
•	toiletter 
•	parkering 
•	bygninger/områder 
Det behøver ikke være et avanceret Google Maps-kort. Til MVP kan det være et simpelt illustreret områdekort eller plantegning med klikbare punkter.
Eksempel:
Besøgende klikker på “Hestestalden” og ser alle stande i området.
Eller de søger “keramik” og får vist relevante stande på kortet.

AI-funktion:
Hvad bruger vi AI til?
AI kan understøtte tre dele:
1. Ansøgningsbehandling
AI kan læse en ansøgning og foreslå:
•	kort opsummering 
•	kategori 
•	manglende information 
•	spørgsmål til standholderen 
•	om ansøgningen matcher udvælgelseskriterierne 
Engestofte nævner selv kriterier som tidligere tilknytning, kvalitet, først til mølle, bredt sortiment og originalitet. 
2. Email automation
AI kan generere mailudkast ud fra status på ansøgningen.
Eksempler:
•	“Tak for din ansøgning” 
•	“Vi mangler billeder af din stand” 
•	“Vi mangler dokumentation vedrørende fødevarer” 
•	“Du er godkendt som stadeholder” 
•	“Her er praktisk information før julemarkedet” 
AI’en skal ikke nødvendigvis sende mails selv. Den skal hjælpe Lise med at skrive hurtigere og mere ensartet.
3. Live map / besøgerhjælp
AI kan senere bruges som en lille julemarkedsassistent:
“Hvor finder jeg keramik?”
“Er der mad til børn?”
“Hvor er julemandens værksted?”
“Hvilke stande sælger smykker?”
I MVP kan det være en simpel søgefunktion i stedet for en fuld chatbot

MVP:
Hvad er den mindste version, vi kan demonstrere?
MVP: Standholderflow med email automation og simpelt live map
Den mindste version er et flow, hvor:
1.	En standholder udfylder en digital ansøgning. 
2.	Ansøgningen vises i Lises admin-dashboard. 
3.	AI laver en kort opsummering og foreslår kategori. 
4.	Systemet genererer et mailudkast baseret på ansøgningens status. 
5.	Lise kan godkende standholderen. 
6.	Den godkendte standholder vises på et simpelt live map. 
Det demonstrerer hele værdikæden:
Fra ansøgning til administration til kommunikation til offentlig visning.
________________________________________
Email automation i MVP
I MVP’en bygger vi ikke et fuldt mailsystem, men vi kan demonstrere:
•	automatisk kvitteringsbesked på skærmen 
•	genereret mailtekst i admin 
•	knap: “Kopier mail” 
•	statusbaserede mailskabeloner 
Eksempel på statusser:
•	Ny ansøgning 
•	Mangler information 
•	Godkendt 
•	Afvist 
•	Klar til offentliggørelse 
Når status ændres, foreslår systemet en relevant mail.
Eksempel:
Status: Mangler information
Systemet foreslår:
Hej [navn]
Tak for jeres ansøgning til Engestofte Julemarked.
Vi mangler lidt information, før vi kan behandle ansøgningen færdigt.
Send gerne [manglende felt].
Venlig hilsen
Engestofte Gods
________________________________________
Live map i MVP
I MVP’en kan live map være meget simpelt:
•	et statisk billede eller SVG-kort over området 
•	klikbare områder: Hestestalden, Kostalden, Laden, Værkstedet, udendørs område 
•	liste over godkendte stande 
•	filter efter kategori 
•	søgning efter stand/produkt 
•	klik på stand → vis navn, kategori og beskrivelse 
Det er vigtigt, at kortet ikke bliver for avanceret.
MVP’en skal ikke kunne:
•	vise realtidsposition 
•	lave rutevejledning 
•	bruge GPS 
•	håndtere store menneskemængder 
•	have avanceret drag-and-drop plantegning 
•	være et fuldt interaktivt tivoli-/festival-map 
Men det skal vise idéen:
Når Lise godkender en standholder, kan den vises direkte på det offentlige julemarkedskort.


Afgrænsning:
Hvad bygger vi ikke?
Hvad bygger vi ikke?
Vi bygger ikke:
•	fuldt betalingssystem 
•	fuld integration med Engestoftes rigtige hjemmeside 
•	automatisk afsendelse af alle emails uden godkendelse 
•	avanceret GDPR-administration 
•	drag-and-drop plantegning med regler 
•	fuld RAG-chatbot 
•	GPS-baseret live navigation 
•	automatisk placering af stande 
•	komplet besøgsapp 
•	fakturering 
•	NemID/MitID-login 
•	fuld historik over flere år


Kundespørgsmål:
Hvilke svar mangler vi?
Hvilke mails sender Lise typisk til stadeholdere?
Skal systemet sende mails automatisk, eller skal Lise godkende dem først?
Findes der allerede et kort/plantegning over julemarkedet?
Hvilke områder skal vises?
Fx Hestestalden, Kostalden, Laden, Værkstedet og udendørs avlsgård.


Antagelser:
Hvad antager vi indtil videre?
Vi antager at:
•	Lise bruger meget tid på gentagne emails 
•	stadeholderdata findes spredt i mails og dokumenter 
•	en digital formular vil reducere copy/paste 
•	mailudkast er mere realistisk end fuld automatisk mailafsendelse 
•	godkendte stande kan bruges direkte til en offentlig stadeholderliste 
•	et simpelt kort giver værdi for besøgende, selv uden GPS 
•	Engestofte har faste områder, hvor standene placeres 
•	Lise stadig skal tage den endelige beslutning om godkendelse og placering 
•	AI skal assistere, ikke beslutte


Næste tre opgaver:
1. Lav et simpelt flowdiagram:
Ansøgning → AI-opsummering → admin-vurdering → mailudkast → godkendelse → vis på live map

2. Lav datamodeller for:
•	Standholder 
•	Ansøgning 
•	Status 
•	EmailTemplate 
•	MapLocation 
•	Category

3. Byg tre skærme:
1.	Ansøgningsformular 
2.	Admin-dashboard med mailudkast 
3.	Live map med godkendte stande
