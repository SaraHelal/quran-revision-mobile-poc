# Quran Revision Mobile POC

A React Native proof of concept for a mobile Quran revision experience.

The app helps users identify Surahs that are due for revision, see their current mastery level, and start a focused revision session.

This project is a mobile exploration of the larger Quran Revision App concept, with an intentionally small scope focused on the core revision journey.

## Current Status

**Version 1 is in development.**

The current implementation includes:

- Today's Revision screen
- Reusable Surah cards
- Weak, Good, and Excellent mastery states
- Dynamic mastery badge styling
- Mock revision data
- Scrollable revision list using `FlatList`
- TypeScript data models

The next step is to make the **Start Revision** action interactive and build the revision session flow.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet

## Project Structure

```text
app/          Application screens and routing
components/   Reusable UI components
data/         Mock data used during POC development
types/        Shared TypeScript types
docs/         Roadmap and project documentation
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

The app can then be opened using Expo Go on a compatible physical device.

## Development Approach

The POC is being developed incrementally, starting with mock data and the core mobile experience before introducing backend infrastructure.

This keeps the initial implementation focused on:

- React Native fundamentals
- Mobile UI and interaction
- Reusable components
- Type-safe data structures
- A clear revision workflow

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — development versions, completed work, and planned features
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — architecture, scope, and key engineering decisions

## Planned Next Steps

- Add Start Revision interaction
- Add navigation to a revision session
- Build the revision session screen
- Record revision results
- Update mastery status
- Add Arabic and RTL support

## Related Project

This repository is a focused mobile proof of concept based on the broader Quran Revision App idea.

The full web application includes a more complete revision and memorisation management workflow.
