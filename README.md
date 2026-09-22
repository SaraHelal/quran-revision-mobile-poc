# Quran Revision Mobile POC

A mobile-first Quran revision application built with React Native, Expo, and TypeScript.

The app helps users manage their memorised Surahs, identify which reviews are due, complete revision sessions, rate their performance, and automatically schedule the next review.

## Current Status

**Version 3 Phase 2 — Local Persistence is complete.**

The application now provides a locally persistent Quran revision experience. Users can manage their memorised Surahs, complete revision sessions, and retain their data after closing or restarting the application.

An installable Android preview build has also been configured using EAS Build.

The next phase will introduce revision history so users can view their previous revision activity.

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
- First-use guidance for users who have not added any Surahs

### Revision and Scheduling

- Suggested and manual review modes
- Spaced review intervals based on mastery
- Due Today and Overdue review timing
- Overdue-first suggestion ordering
- Manual Surah search
- Juz filtering with dynamically generated options
- Latest Added and Weakest First sorting
- Matching-result counts and empty states
- Full static Surah catalogue with Juz metadata
- Separate catalogue and user memorisation records
- Revision sessions with Weak, Good, and Excellent results
- Automatic next-review scheduling
- Success feedback after saving
- Protection against losing unsaved revision progress
- Graceful handling of invalid review routes

### Local Persistence

- Local storage using AsyncStorage
- Dedicated storage service separated from UI components
- Restore memorisation records when the application starts
- Persist added, edited, and deleted Surahs
- Persist mastery and scheduling changes after revision sessions
- Loading state while stored records are restored
- User-facing storage failure handling
- Preserve an intentionally empty memorised Surah list
- Start new installations without development mock records
- Retain user data after closing and reopening the application

### Interface and Delivery

- Reusable cards, buttons, modal, and state components
- Consistent selection styles across Surah, Juz, and sorting lists
- Mobile-first layouts using React Native StyleSheet
- Physical Android device testing
- EAS Build configuration
- Installable Android preview build

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
- AsyncStorage
- React Native Community DateTimePicker
- React Native StyleSheet
- EAS Build

## Project Structure

```text
app/
  _layout.tsx                  Root layout and application loading state
  index.tsx                    Today's Revision screen
  manage-surahs.tsx            Memorised Surah management screen
  add-surah.tsx                Add Surah form
  edit-surah/[id].tsx          Edit Surah form
  review/[id].tsx              Revision session route

components/                    Reusable interface components
constants/                     Shared presentation constants
context/                       Shared application state and domain actions
data/
  surahCatalog.ts              Static Quran metadata
  mockMemorizationRecords.ts   Development fixture data

services/
  memorizationStorage.ts       AsyncStorage access for memorisation records

types/                         Shared TypeScript domain types
utils/                         Scheduling, formatting, and data utilities
docs/                          Architecture and roadmap documentation
eas.json                       EAS Build profiles
```

## Architecture

The application separates live state, persistent storage, static metadata, and presentation responsibilities.

### Static Quran Metadata

`SurahMetadata` contains information that does not belong to a particular user:

- Surah number
- English name
- Arabic name
- Juz membership

The complete catalogue is stored in `data/surahCatalog.ts`.

### User Memorisation Records

`MemorizationRecord` contains user-specific information:

- Record ID
- Surah number
- Memorised date
- Mastery status
- Last review date
- Next review date
- Creation date

### Derived Presentation Data

`MemorizedSurah` combines static Surah metadata with a user memorisation record.

`buildMemorizedSurahs` joins the catalogue and stored records by `surahNumber` when the interface needs complete Surah objects.

Derived `MemorizedSurah` objects are not stored as a second source of truth.

### State and Persistence

`SurahsContext` owns the live memorisation state and exposes domain actions for:

- Adding a Surah
- Editing a Surah
- Deleting a Surah
- Saving a revision result

`services/memorizationStorage.ts` owns AsyncStorage access.

When the application starts, the context restores stored records before rendering the main navigation. Each domain action persists the updated records before confirming success in the interface.

This design keeps screens independent from the storage implementation and makes a future move to another persistence system easier.

## Core Revision Flow

1. Open Today's Revision.
2. Review a suggested Surah or choose one manually.
3. Revise the Surah from memory.
4. Finish the session and select a mastery result.
5. Save the result.
6. Store the updated mastery and review dates locally.
7. Return to the home screen with an updated schedule and confirmation message.

## Surah Management Flow

1. Open My Surahs from the home screen.
2. Browse the current memorised Surahs.
3. Add a Surah from the available catalogue.
4. Choose its memorised date and mastery level.
5. Edit the date or mastery level when required.
6. Delete a Surah after confirming the action.
7. Persist each change locally and display immediate feedback.

## Local Data Behaviour

The application uses device-local storage.

- A new installation starts with an empty memorised Surah list.
- Closing and reopening the application preserves saved data.
- Updating the application preserves existing local data.
- Uninstalling the application or clearing its app data removes locally stored records.
- Data is currently stored on one device and is not synchronised to the cloud.

## Android Preview Build

The project uses the `preview` EAS Build profile to create an installable Android APK for internal testing.

Create a new preview build with:

```bash
npx eas-cli build --platform android --profile preview
```

The generated APK can be installed directly on a compatible Android device or shared with external testers using the EAS build link.

## Current Limitations

- Revision history is not yet recorded.
- Progress analytics are not yet available.
- Data is stored on one device only.
- There are no user accounts or cloud backups.
- Clearing application data or uninstalling the application removes local records.
- The interface is currently English-only.
- The latest build still requires wider external testing and accessibility review.

## Version 3 Direction

### Completed

- Manage memorised Surahs
- Add, edit, and delete memorisation records
- Prevent duplicate records
- Display first-use, empty, loading, success, and error states
- Persist memorisation records locally
- Restore saved records when the application starts
- Persist revision results and scheduling changes
- Create an installable Android preview build

### Next

- Record revision history
- Display recent revision activity
- Add simple progress analytics
- Add one focused progress chart
- Complete usability and accessibility testing
- Collect feedback from external testers
- Prepare portfolio screenshots and a technical case study

Firebase Authentication and cloud synchronisation are intentionally deferred until the product requires user accounts, backups, or multi-device access.

## Getting Started

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Open the project using Expo Go, an Android emulator, or a connected Android device.

Run the TypeScript check:

```bash
npx tsc --noEmit
```

Configure EAS Build if required:

```bash
npx eas-cli build:configure
```

Create an Android preview build:

```bash
npx eas-cli build --platform android --profile preview
```

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — completed versions and the Version 3 delivery plan
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — architecture, data model, user flows, and engineering decisions

## Related Project

This repository is the mobile implementation of the broader Quran Revision product concept.

A separate web version uses React, TypeScript, Firebase Authentication, and Cloud Firestore.
