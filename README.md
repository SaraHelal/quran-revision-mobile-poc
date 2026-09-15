# Quran Revision Mobile POC

A mobile-first Quran revision application built with React Native, Expo, and TypeScript.

The app helps users manage their memorised Surahs, identify which reviews are due, complete revision sessions, rate their performance, and automatically schedule the next review.

## Current Status

**Version 3 Phase 1 — Manage Memorised Surahs is complete.**

The application currently provides a complete in-memory revision and Surah-management experience.

The next phase will introduce local persistence so additions, edits, deletions, and revision results remain available after restarting the application.

## Completed Features

### Memorised Surah Management

- Dedicated My Surahs screen
- Full Surah catalogue browsing and search
- Automatic Surah number and Juz metadata display
- Add a Surah with its memorised date and mastery level
- Prevent duplicate memorisation records
- Display all memorised Surahs
- Sort newly added Surahs first
- Edit memorised dates and mastery levels
- Delete a Surah with confirmation
- Display success feedback after add, edit, and delete actions
- Display an empty state when no Surahs are memorised
- Handle invalid edit routes gracefully
- Direct navigation to My Surahs from the home screen

### Revision and Scheduling

- Suggested and manual review modes
- Spaced review intervals based on mastery
- Due Today and Overdue review timing
- Overdue-first suggestion ordering
- Manual Surah search
- Juz filtering with dynamic options
- Latest Added and Weakest First sorting
- Matching-result counts and empty states
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

| Result    | Next review |
| --------- | ----------: |
| Weak      |       1 day |
| Good      |      3 days |
| Excellent |      7 days |

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- React Native `StyleSheet`
- React Native Community DateTimePicker

## Project Structure

```text
app/                              Screens and file-based routes
  index.tsx                       Today's Revision screen
  manage-surahs.tsx               Memorised Surah management screen
  add-surah.tsx                   Add Surah form
  edit-surah/[id].tsx             Edit Surah form
  review/[id].tsx                 Revision session route

components/                       Reusable interface components
constants/                        Shared presentation constants
context/                          Shared application state and actions
data/surahCatalog.ts              Static Quran metadata
data/mockMemorizationRecords.ts   Temporary user memorisation records
types/                            Shared TypeScript domain types
utils/                            Scheduling, formatting, and data utilities
docs/                             Architecture and roadmap documentation
```

## Data Design

Static Quran metadata and user-specific memorisation data are stored separately.

- `SurahMetadata` contains names, Surah number, and Juz membership.
- `MemorizationRecord` contains the memorised date, mastery status, review dates, and record metadata.
- `MemorizedSurah` combines the catalogue metadata and memorisation record.
- `buildMemorizedSurahs` joins the two sources by Surah number for presentation.

This keeps the source of truth clear, prevents catalogue metadata from being duplicated, and prepares the application for persistent storage.

## Core Revision Flow

1. Open Today's Revision.
2. Review a suggested Surah or choose one manually.
3. Revise the Surah from memory.
4. Finish the session and select a mastery result.
5. Save the result.
6. Return to the home screen with an updated schedule and confirmation message.

## Surah Management Flow

1. Open My Surahs from the home screen.
2. Browse the current memorised Surahs.
3. Add a Surah from the available catalogue.
4. Choose its memorised date and mastery level.
5. Edit the date or mastery level when required.
6. Delete a Surah after confirming the action.
7. Return to the list with immediate feedback.

## Current Limitation

User records are still held in memory through React Context.

Reloading or restarting the application restores the original mock records. Version 3 Phase 2 will replace this behaviour with local persistent storage using AsyncStorage.

## Version 3 Direction

Version 3 focuses on making the application usable by external testers.

### Completed

- Manage memorised Surahs
- Add, edit, and delete memorisation records
- Prevent duplicate records
- Display success and empty states

### Planned

- Persist data locally with AsyncStorage
- Restore saved data when the application starts
- Record revision history
- Display focused progress analytics
- Create an installable Android build

Firebase Authentication and cloud synchronisation are intentionally deferred until the product requires user accounts or multi-device access.

## Getting Started

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Open the project using Expo Go or a compatible Android development environment.

Run the TypeScript check:

```bash
npx tsc --noEmit
```

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — completed versions and the Version 3 delivery plan
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — architecture, data model, user flows, and engineering decisions

## Related Project

This repository is the mobile implementation of the broader Quran Revision product concept.

A separate web version uses React, TypeScript, Firebase Authentication, and Cloud Firestore.
