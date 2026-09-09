# Quran Revision Mobile POC — Project Context

**Last updated:** 9 September 2026  
**Current status:** Version 2 completed; Version 3 planned

## Overview

Quran Revision Mobile POC is a React Native and Expo application for organising Quran revision. It helps users see which memorised Surahs are due, choose another Surah manually, complete a revision session, rate the result, and automatically schedule the next review.

The project is intended both as a useful mobile product and as a portfolio project demonstrating React Native, TypeScript, product thinking, reusable UI, domain modelling, navigation, and state management.

## Technology Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- React Native `StyleSheet`
- In-memory mock records during Versions 1 and 2

## Current Architecture

```text
app/
  _layout.tsx
  index.tsx
  review/
    [id].tsx

components/
  AppModal.tsx
  ManualSurahList.tsx
  NotFoundState.tsx
  PrimaryButton.tsx
  ReviewModeTabs.tsx
  SecondaryButton.tsx
  SessionSurahInfo.tsx
  SuggestedSurahList.tsx
  SurahCard.tsx
  SurahSummary.tsx

constants/
  masteryStyles.ts

context/
  SurahsContext.tsx

data/
  mockMemorizationRecords.ts
  surahCatalog.ts

types/
  index.ts

utils/
  buildMemorizedSurahs.ts
  reviewSchedule.ts

docs/
  PROJECT_CONTEXT.md
  ROADMAP.md
```

## Data Model

The data is deliberately separated into two concerns.

### Surah metadata

`SurahMetadata` represents facts that do not belong to a specific user:

- Surah number
- English name
- Arabic name
- Juz numbers

The complete static catalogue is stored in `data/surahCatalog.ts`.

### User memorisation record

`MemorizationRecord` represents user-specific state:

- Record ID
- Surah number
- Mastery status
- Last review date
- Next review date
- Creation date

`buildMemorizedSurahs` joins memorisation records with catalogue metadata by `surahNumber`. The resulting `MemorizedSurah` objects are consumed by the interface.

This structure avoids duplicating names and Juz metadata inside every user record and prepares the application for persistent storage.

## Current User Experience

### Suggested mode

- Shows only Surahs currently due for revision.
- Displays an empty state when no reviews are due.
- Marks overdue items without adding redundant labels to items due today.
- Places overdue items before items due today.
- Starts a revision session from the selected Surah card.

### Manual mode

- Shows all currently memorised Surahs, including those not yet due.
- Searches Surah names using normalised, case-insensitive text.
- Filters Surahs by Juz.
- Generates available Juz options from the user's current Surahs.
- Sorts results by Latest Added or Weakest First.
- Shows the current number of matching Surahs.

### Revision session

1. The user opens a Surah from either review mode.
2. The app displays revision guidance.
3. The user finishes the revision and chooses Weak, Good, or Excellent.
4. The shared context saves the result.
5. The app records the review time and calculates the next review date.
6. The user returns to the home screen and receives success feedback.

## Review Scheduling Rules

| Result | Next review |
|---|---:|
| Weak | 1 day |
| Good | 3 days |
| Excellent | 7 days |

A Surah is due when its next review date is today or earlier. A missing next review date is currently treated as due today so initial mock records remain reviewable.

## Shared State

`SurahsContext` owns the memorisation records and exposes the derived memorised Surahs to the screens.

Revision updates are performed through a domain action exposed by the context rather than exposing the internal state setter. This keeps screens independent from the context's storage implementation and will make the move to AsyncStorage easier in Version 3.

## Key Engineering Decisions

### Static catalogue and user records are separate

Surah names, numbers, Arabic names, and Juz membership belong to the catalogue. Mastery and review dates belong to the user. They are joined only when the UI needs complete objects.

### Derived data is not stored twice

`MemorizedSurah[]` is rebuilt from the current records and static catalogue. It is not maintained as a second independent source of truth.

### Suggested and manual lists are separate components

The two modes share Surah cards but have different responsibilities. Suggested mode focuses on scheduling priority; manual mode owns search, Juz filtering, and sorting.

### Reusable modal behaviour

`AppModal` centralises the overlay, close button, Android back handling, backdrop dismissal, and content container. Feature components provide only their modal content and selection callbacks.

### Navigation protection

After a revision is finished but before it is saved, leaving the session displays a confirmation alert. Normal navigation is allowed before meaningful progress or after a successful save.

### Local persistence before Firebase

Version 3 will use AsyncStorage first because the initial product is single-user and should work offline. Firebase remains a later option for authentication, backup, and multi-device synchronisation.

## Current Limitations

- Data resets when the application reloads or restarts.
- Users cannot yet add or remove memorised Surahs.
- Revision sessions do not yet create persistent history entries.
- Progress analytics are not yet available.
- The application has not yet been packaged for external testers.
- The interface is English-only.

## Next Milestone

Version 3 will turn the proof of concept into a locally persistent application that another person can configure and use. Development begins with the Add a Surah experience, followed by AsyncStorage, revision history, focused progress insights, and an installable Android build.

See `docs/ROADMAP.md` for the phased Version 3 plan.
