# MAST Webshop

[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Latest-purple)](https://ui.shadcn.com/)

## Projektbeskrivning

MAST Webshop är en e-handelsplattform byggd med moderna webbteknologier som React, Next.js och TypeScript. Projektet representerar en fullständig e-handelsupplevelse med följande funktioner:

- **Startsida** som visar alla tillgängliga produkter med möjlighet att filtrera och sortera
- **Produktsida** med detaljerad information om varje produkt
- **Kundvagn** för att hantera valda produkter
- **Utcheckningssida** med formulär för leveransinformation
- **Orderbekräftelse** med översikt av beställningen
- **Admingränssnitt** för att hantera produkter (CRUD-funktionalitet)

Webbshopen är byggd med responsiv design i åtanke och fungerar väl på mobila enheter, surfplattor och datorer. Projektet använder Shadcn UI som designsystem för att säkerställa en konsekvent och estetiskt tilltalande användarupplevelse.

## Tekniker

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Tillståndhantering**: React Context API
- **Routing**: Next.js App Router
- **Formulärvalidering**: Inbyggd validering med felmeddelanden
- **Datalagring**: LocalStorage för kundvagn, serverbaserad lagring för produkter

## Projektstruktur

```
/app                     # Next.js app router sidor
  /admin                 # Admin gränssnitt
  /checkout              # Utcheckningssida
  /confirmation          # Orderbekräftelsesida
  /product               # Produktdetaljsida
/components              # React komponenter
  /layout                # Layout komponenter (Header, Footer)
  /ui                    # UI komponenter från Shadcn
/contexts                # React contexts för global state
/data                    # Datakällor och modeller
/hooks                   # Custom React hooks
/public                  # Statiska tillgångar
```

## Installation och användning

### Förutsättningar

- Node.js 16.8.0 eller senare
- npm eller yarn

### Installation

1. Klona repositoryt:

   ```bash
   git clone https://github.com/din-användare/nextjs-webshop-ts-react-mast.git
   cd nextjs-webshop-ts-react-mast
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

### Kör projektet

- **Utvecklingsläge:**

  ```bash
  npm run dev
  ```

  Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

- **Produktionsbygge:**

  ```bash
  npm run build
  npm start
  ```

- **Testa projektet:**

  ```bash
  npm test
  ```

- **Uppdatera tester:**
  ```bash
  npm run update
  ```

## Design System

Projektet använder [Shadcn UI](https://ui.shadcn.com/), ett modernt designsystem som bygger på Radix UI och Tailwind CSS. Det erbjuder tillgänglighetsanpassade och högkvalitativa komponenter som är enkla att anpassa efter behov.

### Huvudkomponenter som används:

- Alert
- Button
- Card
- Dialog
- Form
- Table
- Tabs

För fullständig dokumentation av komponenterna, besök [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs).

## Funktioner

### Kund

- Bläddra bland produkter på startsidan
- Se detaljerad produktinformation
- Lägg till produkter i kundvagnen
- Justera antal eller ta bort produkter från kundvagnen
- Fyll i leveransinformation med validering
- Få orderbekräftelse med unikt ordernummer

### Admin

- Se alla produkter i en tabellistning
- Lägga till nya produkter
- Redigera befintliga produkter
- Ta bort produkter

## Teamet

Projektet utvecklades av MAST teamet:

- M ali
- A nders
- A hmad
- S umaya
- T omas

## Licens

Detta projekt är licensierat under MIT-licensen.
