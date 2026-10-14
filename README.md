# Teams Organiser

Teams Organiser is a web application designed to help organise teams for **Warhammer 40,000** games. It provides a simple interface for managing player slots and assigning mission dispositions, making it easier to coordinate a team and keep track of which dispositions are still available.

## Features

- **Configurable team size** — set the maximum number of players on your team.
- **Player slot management** — add and remove slots as needed, up to the configured player limit.
- **Mission disposition assignment** — assign a disposition to each player slot.
- **Disposition tracking** — see which dispositions have been selected and which remain available.
- **Selection limits** — prevent dispositions from being assigned too many times, with support for doubling the limit for larger teams.
- **Colour-coded dispositions** — distinguish between dispositions at a glance.

### Supported dispositions

| Disposition | Colour |
|---|---|
| Priority Assets | Gold |
| Reconnaissance | Teal |
| Take and Hold | Green |
| Purge the Foe | Red |
| Disruption | Blue |

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework
- [React 19](https://react.dev/) — UI components and state management
- [TypeScript](https://www.typescriptlang.org/) — type safety
- CSS Modules — component-level styling
- [ESLint](https://eslint.org/) — code linting

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/nathan-snelson/teams-organiser.git
cd teams-organiser
```

Install the dependencies:

```bash
npm install
```

### Development server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

The development server supports hot reloading as you make changes.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
teams-organiser/
├── src/
│   ├── app/
│   │   ├── ui/
│   │   │   ├── controls.tsx
│   │   │   └── tile/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── helper.ts
│   └── types.ts
├── package.json
├── next.config.ts
└── tsconfig.json
```

The main application interface is rendered by `src/app/page.tsx`. Team controls and disposition tracking are managed in `src/app/ui/controls.tsx`, with individual player slots handled by the tile components.

## Building for Production

Create an optimised production build:

```bash
npm run build
```

Once the build completes successfully, run the application in production mode:

```bash
npm run start
```

## Contributing

Contributions, suggestions, and bug reports are welcome. Feel free to open an issue or submit a pull request on [GitHub](https://github.com/nathan-snelson/teams-organiser).

## Licence

No licence has been specified in the repository. Please check with the repository owner before redistributing or reusing the project.
