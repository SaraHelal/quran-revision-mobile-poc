# Quran Revision Mobile POC

A mobile-first Quran revision application built with React Native, Expo, and TypeScript.

The app helps users identify memorised Surahs that are due, choose another Surah manually, complete a revision session, rate the result, and automatically schedule the next review.

## Current Status

**Version 2 — Scheduling and Review Discovery is complete.**

The application currently provides a complete in-memory revision experience. Version 3 will add Surah management, local persistence, revision history, progress insights, and an installable Android build.

## Completed Features

- Suggested and manual review modes
- Spaced review intervals based on mastery
- Due Today and Overdue review timing
- Overdue-first suggestion ordering
- Manual Surah search
- Juz filtering with dynamic options
- Latest Added and Weakest First sorting
- Matching-result count and empty states
- Full static Surah catalogue with Juz metadata
- Separate catalogue and user memorisation records
- Revision sessions with Weak, Good, and Excellent results
- Automatic next-review scheduling
- Shared state using React Context
- Success feedback after saving
- Protection against losing unsaved revision progress
- Graceful handling of invalid review routes
- Reusable cards, buttons, modal, and state components

## Review Schedule

| Result | Next review |
|---|---:|
| Weak | 1 day |
| Good | 3 days |
| Excellent | 7 days |

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- React Native `StyleSheet`

## Project Structure

```text
app/                         Screens and file-based routes
components/                  Reusable interface components
constants/                   Shared presentation constants
context/                     Shared application state and actions
data/surahCatalog.ts         Static Quran metadata
data/mockMemorizationRecords.ts
                              Temporary user data
types/                       Shared TypeScript domain types
utils/                       Scheduling and data-building utilities
docs/                        Architecture and roadmap documentation
```

## Data Design

Static Quran metadata and user-specific revision data are stored separately.

- `SurahMetadata` contains names, Surah number, and Juz membership.
- `MemorizationRecord` contains mastery and review dates.
- `buildMemorizedSurahs` joins them by Surah number for presentation.

This keeps the source of truth clear and prepares the application for persistent storage without duplicating catalogue data.

## Core Flow

1. Open Today's Revision.
2. Review a suggested Surah or choose one manually.
3. Revise the Surah from memory.
4. Finish the session and select a mastery result.
5. Save the result.
6. Return to the home screen with an updated schedule and confirmation message.

## Current Limitation

User records are still held in memory. Reloading or restarting the application restores the mock records. Version 3 will replace this behaviour with local persistent storage.

## Version 3 Direction

Version 3 focuses on making the application usable by external testers:

- Add and remove memorised Surahs
- Persist data locally with AsyncStorage
- Record revision history
- Display focused progress analytics
- Create an installable Android build

Firebase authentication and cloud synchronisation are intentionally deferred until the product requires accounts or multi-device access.

## Getting Started

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Open the project with a compatible Expo Go application or Android development environment.

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — completed versions and the Version 3 delivery plan
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — architecture, data model, user flows, and engineering decisions

## Related Project

This repository is the mobile implementation of the broader Quran Revision product concept. A separate web version uses React, TypeScript, Firebase Authentication, and Cloud Firestore.
