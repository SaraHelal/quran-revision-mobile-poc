# Quran Revision Mobile POC — Project Context

**Last updated:** 15 September 2026

**Current status:** Version 3 Phase 1 completed; Phase 2 planned

## Overview

Quran Revision Mobile POC is a React Native and Expo application for organising Quran memorisation and revision.

It helps users manage their memorised Surahs, identify which reviews are due, choose another Surah manually, complete a revision session, rate the result, and automatically schedule the next review.

The project is intended both as a useful mobile product and as a portfolio project demonstrating React Native, TypeScript, product thinking, reusable UI, domain modelling, file-based navigation, form flows, and state management.

## Technology Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- React Native `StyleSheet`
- React Native Community DateTimePicker
- In-memory mock records during Versions 1, 2, and Version 3 Phase 1

## Current Architecture

```text
app/
  _layout.tsx
  index.tsx
  add-surah.tsx
  manage-surahs.tsx
  edit-surah/
    [id].tsx
  review/
    [id].tsx

components/
  AppModal.tsx
  ManageSurahCard.tsx
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
  formatDateOnly.ts
  normalizeSearchText.ts
  reviewSchedule.ts

docs/
  PROJECT_CONTEXT.md
  ROADMAP.md
```

## Data Model

The data is deliberately separated into two concerns.

### Surah Metadata

`SurahMetadata` represents Quran information that does not belong to a specific user:

- Surah number
- English name
- Arabic name
- Juz numbers

The complete static catalogue is stored in `data/surahCatalog.ts`.

`juzNumbers` is stored as an array because a Surah may span more than one Juz.

### User Memorisation Record

`MemorizationRecord` represents user-specific state:

- Record ID
- Surah number
- Mastery status
- Memorised date
- Last review date
- Next review date
- Creation timestamp

`buildMemorizedSurahs` joins memorisation records with catalogue metadata using `surahNumber`.

The resulting `MemorizedSurah` objects are consumed by the interface.

This structure avoids duplicating names and Juz metadata inside every user record and prepares the application for persistent storage.

### Date Representation

Dates serving different purposes use different representations:

- `memorizedAt` uses a date-only `YYYY-MM-DD` value because the time of day is not relevant.
- `createdAt`, `lastReviewDate`, and `nextReviewDate` use ISO date-time strings.

`formatDateOnly` and `parseDateOnly` convert between the date-only storage value and a local JavaScript `Date` without introducing UTC date shifts.

## Current User Experience

### Home Screen

- Displays the Today's Revision header.
- Provides direct access to My Surahs from the header.
- Displays success feedback returned from revision and Surah-management flows.
- Allows the user to switch between suggested and manual review modes.

### Suggested Mode

- Shows only Surahs currently due for revision.
- Displays an empty state when no reviews are due.
- Marks overdue items without adding redundant labels to items due today.
- Places overdue items before items due today.
- Starts a revision session from the selected Surah card.

### Manual Mode

- Shows all currently memorised Surahs, including those not yet due.
- Searches Surah names using normalised, case-insensitive text.
- Filters Surahs by Juz.
- Generates available Juz options from the user's current Surahs.
- Sorts results by Latest Added or Weakest First.
- Shows the current number of matching Surahs.

### Revision Session

1. The user opens a Surah from either review mode.
2. The app displays revision guidance.
3. The user finishes the revision and chooses Weak, Good, or Excellent.
4. The shared context saves the result.
5. The app records the review time and calculates the next review date.
6. The user returns to the home screen and receives success feedback.

### Manage Memorised Surahs

- Displays all currently memorised Surahs.
- Shows each Surah's name, number, Juz membership, and mastery status.
- Displays newly added Surahs first.
- Displays the current number of memorised Surahs.
- Provides actions to add, edit, and delete records.
- Confirms destructive deletion before changing the data.
- Displays an empty state when no records exist.
- Displays success feedback after add, edit, and delete operations.

### Add Surah

1. The user opens the Add Surah screen from My Surahs.
2. The user opens a searchable Surah-selection modal.
3. The catalogue excludes Surahs that are already memorised.
4. Selecting a Surah displays its Surah number and Juz membership.
5. The user chooses a memorised date.
6. The user chooses Weak, Good, or Excellent.
7. The shared context creates the record.
8. The user returns to My Surahs with success feedback.

New records receive a null `nextReviewDate`, which makes them immediately available for an initial revision.

### Edit Surah

1. The user opens the dynamic `edit-surah/[id]` route.
2. The screen finds the matching memorisation record from shared state.
3. The Surah identity and catalogue metadata remain read-only.
4. The user may update the memorised date and mastery status.
5. The shared context updates the existing record.
6. The user returns to My Surahs with success feedback.

An invalid record ID displays a not-found state instead of crashing the application.

## Review Scheduling Rules

| Result    | Next review |
| --------- | ----------: |
| Weak      |       1 day |
| Good      |      3 days |
| Excellent |      7 days |

A Surah is due when its next review date is today or earlier.

A missing next review date is treated as due so newly added or not-yet-reviewed Surahs remain reviewable.

## Shared State

`SurahsContext` owns the current memorisation records and exposes derived `MemorizedSurah` objects to the screens.

The context currently exposes domain actions for:

- Saving a revision result
- Adding a memorisation record
- Updating a memorisation record
- Deleting a memorisation record
- Setting success feedback

Screens call these actions instead of accessing the internal records state setter.

This keeps presentation components independent from the storage implementation and prepares the application for replacing in-memory state with AsyncStorage.

## Key Engineering Decisions

### Static Catalogue and User Records Are Separate

Surah names, numbers, Arabic names, and Juz membership belong to the catalogue.

Mastery, memorised date, and review dates belong to the user record. The two sources are joined only when the UI needs complete objects.

### Derived Data Is Not Stored Twice

`MemorizedSurah[]` is rebuilt from the current records and static catalogue. It is not maintained as a second independent source of truth.

### Context Exposes Domain Actions

Components call actions such as `addSurah`, `updateSurah`, `deleteSurah`, and `saveRevision`.

They do not receive direct access to `setRecords`. This limits invalid state changes and allows the storage implementation to change later.

### Duplicate Protection Exists at Multiple Levels

The Add Surah catalogue removes Surahs that are already memorised, preventing users from selecting a duplicate.

The context also checks the records before adding a new entry, providing an additional domain-level safeguard.

### Surah Identity Is Read-Only During Editing

The edit flow allows changes to the memorised date and mastery status, but not the selected Surah.

Changing the Surah identity would represent replacing one memorisation record with another and belongs to the add/delete flows.

### New Records Are Sorted Without Mutating Context State

The My Surahs screen creates a copied array before sorting by `createdAt`.

This keeps the context-owned array immutable while displaying newly added records first.

### Suggested and Manual Lists Are Separate Components

The two review modes share Surah cards but have different responsibilities.

Suggested mode focuses on scheduling priority. Manual mode owns search, Juz filtering, and sorting.

### Date-Only Values Avoid UTC Shifts

The memorised date is parsed using numeric year, month, and day values rather than `new Date("YYYY-MM-DD")`.

This prevents the selected date from shifting backward in time zones behind UTC.

### Modal Behaviour Supports Android Navigation

Selection modals handle Android hardware-back requests using `onRequestClose`.

The Surah selector uses a bottom-sheet-style layout suitable for a long, searchable catalogue.

### Navigation Protection

After a revision is finished but before it is saved, leaving the session displays a confirmation alert.

Normal navigation is allowed before meaningful progress or after a successful save.

### Destructive Actions Require Confirmation

Deleting a memorised Surah opens a native confirmation alert containing the Surah name.

The record is deleted only after the user confirms the action.

### Local Persistence Before Firebase

Version 3 Phase 2 will use AsyncStorage first because the initial product is single-user and should work offline.

Firebase remains a later option for authentication, backup, and multi-device synchronisation.

## Current Limitations

- Data resets when the application reloads or restarts.
- Revision sessions do not yet create persistent history entries.
- Progress analytics are not yet available.
- The application has not yet been packaged for external testers.
- The interface is English-only.
- Authentication and multi-device synchronisation are not implemented.

## Testing Completed

Version 3 Phase 1 was manually tested on an Android device.

The verified flows include:

- Adding a Surah
- Excluding already memorised Surahs from selection
- Displaying Surah and Juz metadata
- Updating the memorised date
- Updating the mastery level
- Deleting a Surah after confirmation
- Displaying add, edit, and delete success feedback
- Displaying an empty My Surahs state
- Handling an invalid edit route
- Navigating between the home and management screens
- Displaying long memorised-Surah lists without clipping

The project also passes:

```bash
npx tsc --noEmit
```

## Next Milestone

Version 3 Phase 2 will replace the in-memory-only experience with local persistence.

The next work will:

1. Introduce a storage service.
2. Save memorisation records using AsyncStorage.
3. Restore saved records when the application starts.
4. Persist changes made by add, edit, delete, and revision actions.
5. Display loading and storage failure states.

See `docs/ROADMAP.md` for the complete Version 3 delivery plan.
