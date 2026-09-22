# Quran Revision Mobile POC — Project Context

**Last updated:** 22 September 2026

**Current status:** Version 3 Phase 2 completed; Phase 3 planned

## Overview

Quran Revision Mobile POC is a React Native and Expo application for organising Quran memorisation and revision.

It helps users manage their memorised Surahs, identify which reviews are due, choose another Surah manually, complete a revision session, rate the result, and automatically schedule the next review.

The application now supports local persistence, allowing memorisation records and revision changes to remain available after the application is closed or restarted.

The project is intended both as a useful mobile product and as a portfolio project demonstrating React Native, TypeScript, product thinking, reusable UI, domain modelling, file-based navigation, state management, persistent storage, and Android delivery.

## Technology Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- AsyncStorage
- React Native StyleSheet
- React Native Community DateTimePicker
- EAS Build

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

services/
  memorizationStorage.ts

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

app.json
eas.json
```

## Data Model

The data is deliberately separated into static Quran metadata and user-specific memorisation records.

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

These records are the persistent source of truth for the user's memorised Surahs.

### Derived Memorised Surah

`buildMemorizedSurahs` joins memorisation records with catalogue metadata using `surahNumber`.

The resulting `MemorizedSurah` objects are consumed by the interface but are not stored as a second independent source of truth.

This avoids duplicating Surah names and Juz metadata inside every user record.

### Date Representation

Dates serving different purposes use different representations:

- `memorizedAt` uses a date-only `YYYY-MM-DD` value because the time of day is not relevant.
- `createdAt`, `lastReviewDate`, and `nextReviewDate` use ISO date-time strings.

`formatDateOnly` and `parseDateOnly` convert between date-only storage values and local JavaScript `Date` objects without introducing UTC date shifts.

## State and Persistence

### React Context

`SurahsContext` owns the live in-memory state used while the application is running.

It exposes:

- Derived `MemorizedSurah` objects
- Loading state
- Success feedback
- Storage failure feedback
- Domain actions for add, edit, delete, and revision operations

Screens call these domain actions rather than receiving direct access to the internal records state setter.

### AsyncStorage Service

`services/memorizationStorage.ts` owns access to AsyncStorage.

It provides operations for:

- Saving memorisation records
- Loading memorisation records
- Serialising records to JSON
- Parsing stored JSON back into typed records

UI components and screens do not access AsyncStorage directly.

### Application Hydration

When the application starts:

1. `SurahsProvider` begins with an empty records array.
2. The provider exposes `isLoading: true`.
3. Stored records are requested from `memorizationStorage`.
4. If stored records exist, they become the current context state.
5. If no records have been stored, an empty array is saved and displayed.
6. Loading finishes before the main application navigator is rendered.

A new installation therefore starts with an empty memorised Surah list rather than development mock records.

### Persisting Changes

The context uses a shared persistence operation for all record changes.

For each add, edit, delete, or revision action:

1. The updated records array is calculated.
2. The new array is saved to AsyncStorage.
3. Context state is updated only after storage succeeds.
4. The screen displays success feedback after the action resolves.

If saving fails, the operation throws an error and the application displays a storage error instead of reporting false success.

### Empty Data Is Valid Data

The storage layer distinguishes between:

- `null`: no value has been stored yet.
- `[]`: the user intentionally has no memorised Surahs.

This prevents deleted records or an intentionally empty list from being replaced by development mock data.

## Current User Experience

### First Use

When no memorised Surahs exist:

- The home screen displays first-use guidance.
- The user is invited to add their first Surah.
- Revision tabs and misleading completion messages are hidden.
- The Add Surah action opens the catalogue form directly.

After the first Surah is added, the normal revision interface becomes available.

### Home Screen

- Displays the Today's Revision header.
- Provides direct access to My Surahs.
- Adapts its subtitle to the user's current state.
- Displays success feedback returned from revision and management flows.
- Allows users with memorised Surahs to switch between suggested and manual review modes.

### Suggested Mode

- Shows only Surahs currently due for revision.
- Displays a completion state when the user has Surahs but no reviews are due.
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
- Uses consistent selected-option styling in Juz and sorting modals.

### Revision Session

1. The user opens a Surah from either review mode.
2. The application displays revision guidance.
3. The user finishes the revision.
4. The user chooses Weak, Good, or Excellent.
5. The context calculates the next review date.
6. The updated mastery and review dates are saved locally.
7. The user returns to the home screen with success feedback.

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

1. The user opens the Add Surah screen.
2. The user opens a searchable Surah-selection modal.
3. The catalogue excludes Surahs that are already memorised.
4. Selecting a Surah displays its Surah number and Juz membership.
5. The selected Surah is visually highlighted when the modal is reopened.
6. The user chooses a memorised date.
7. The user chooses Weak, Good, or Excellent.
8. The context creates and persists the record.
9. The user returns with success feedback.

New records receive a null `nextReviewDate`, which makes them immediately available for an initial revision.

### Edit Surah

1. The user opens the dynamic `edit-surah/[id]` route.
2. The screen finds the matching memorisation record from shared state.
3. The Surah identity and catalogue metadata remain read-only.
4. The user may update the memorised date and mastery status.
5. The context persists the updated record.
6. The user returns to My Surahs with success feedback.

An invalid record ID displays a not-found state instead of crashing the application.

### Delete Surah

1. The user selects Delete from a memorised Surah card.
2. A native alert displays the Surah name and requests confirmation.
3. The context removes and persists the updated records array.
4. Success feedback appears only after storage succeeds.

## Review Scheduling Rules

| Result    | Next review |
| --------- | ----------: |
| Weak      |       1 day |
| Good      |      3 days |
| Excellent |      7 days |

A Surah is due when its next review date is today or earlier.

A missing next review date is treated as due so newly added or not-yet-reviewed Surahs remain reviewable.

## Key Engineering Decisions

### Static Catalogue and User Records Are Separate

Surah names, numbers, Arabic names, and Juz membership belong to the catalogue.

Mastery, memorised date, and review dates belong to the user record. The two sources are joined only when the interface needs complete objects.

### Derived Data Is Not Stored Twice

`MemorizedSurah[]` is rebuilt from current records and the static catalogue.

It is not maintained as another independent source of truth.

### Context and Storage Have Different Responsibilities

React Context provides live application state and domain actions.

AsyncStorage provides durability between application sessions.

AsyncStorage does not replace Context, and Context does not provide persistence by itself.

### Storage Access Is Isolated

Screens do not call AsyncStorage directly.

The storage service can later be replaced or extended without rewriting presentation components.

### Persistence Completes Before Success

Domain actions are asynchronous.

The application waits for storage to succeed before updating the interface, navigating away, or showing success feedback.

This avoids displaying success for a change that was not stored.

### Duplicate Protection Exists at Multiple Levels

The Add Surah catalogue removes Surahs that are already memorised.

The context also checks existing records before adding a new entry, providing a second domain-level safeguard.

### Surah Identity Is Read-Only During Editing

The edit flow allows changes to the memorised date and mastery status but not the selected Surah.

Changing the Surah identity would represent replacing one memorisation record with another and belongs to the add/delete flows.

### New Records Are Sorted Without Mutating Context State

The My Surahs screen creates a copied array before sorting by `createdAt`.

This preserves the context-owned array while displaying newly added records first.

### Suggested and Manual Lists Are Separate Components

Suggested mode focuses on scheduling priority.

Manual mode owns search, Juz filtering, result counts, and sorting.

Both modes reuse the same Surah card component.

### Date-Only Values Avoid UTC Shifts

The memorised date is parsed using numeric year, month, and day values instead of `new Date("YYYY-MM-DD")`.

This prevents the selected date from shifting backward in time zones behind UTC.

### Modal Behaviour Supports Android Navigation

Selection modals handle Android hardware-back requests using `onRequestClose`.

Selected options use a consistent visual treatment across catalogue, Juz, and sorting lists.

### Navigation Protection Preserves Revision Progress

After a revision is finished but before it is saved, leaving the session displays a confirmation alert.

Normal navigation is allowed before meaningful progress or after a successful save.

### Destructive Actions Require Confirmation

Deleting a memorised Surah requires explicit confirmation.

The record is removed only after the user confirms the action.

### Local Persistence Comes Before Firebase

The current product is designed as a single-user, offline-first experience.

AsyncStorage is appropriate for this stage because it does not require accounts, internet access, or backend infrastructure.

Firebase remains a future option for authentication, backup, and multi-device synchronisation.

## Loading and Error Handling

- The root layout displays a loading indicator while records are restored.
- The main navigator is not rendered until hydration completes.
- Storage reading failures fall back to a safe empty state.
- Storage writing failures prevent false success feedback.
- A shared storage error is displayed using a native alert.
- Users can dismiss the error and retry their action.

## Android Build and Distribution

The project is connected to EAS using an Expo project ID.

The Android application identifier is:

```text
com.sarahelal.quranrevisionmobilepoc
```

The `preview` EAS profile uses internal distribution to create an installable APK.

Build command:

```bash
npx eas-cli build --platform android --profile preview
```

An Android preview build has been successfully generated and installed on a physical device.

External tester distribution and wider usability feedback remain pending.

## Testing Completed

The project has been manually tested on a physical Android device.

Verified flows include:

- Starting with an empty memorised Surah list
- Displaying first-use guidance
- Adding a Surah
- Excluding already memorised Surahs from selection
- Displaying Surah and Juz metadata
- Preserving records after closing and reopening the application
- Updating the memorised date
- Updating the mastery level
- Persisting edit changes
- Deleting a Surah after confirmation
- Persisting deletions
- Completing and saving a revision session
- Persisting mastery and scheduling changes
- Displaying add, edit, delete, and revision success feedback
- Displaying empty and no-review states
- Handling invalid edit and revision routes
- Protecting unsaved revision progress
- Navigating between the home and management screens
- Displaying long memorised-Surah lists without clipping
- Installing an EAS-generated Android APK

The project also passes:

```bash
npx tsc --noEmit
```

## Current Limitations

- Revision sessions do not yet create history entries.
- Progress analytics are not yet available.
- Data is stored locally on one device only.
- Uninstalling the application or clearing app data removes stored records.
- Authentication and cloud backup are not implemented.
- Multi-device synchronisation is not implemented.
- The interface is English-only.
- Wider external testing and accessibility review are still pending.
- The application is not yet published through an app store.

## Next Milestone

Version 3 Phase 3 will introduce locally persisted revision history.

The next work will:

1. Define a revision-history data model.
2. Create one history entry for each saved revision.
3. Persist history entries locally.
4. Restore history when the application starts.
5. Display recent revision activity.
6. Add empty, loading, and storage failure states for history.

After revision history, the project will add a small set of useful analytics and one focused progress chart.

See `docs/ROADMAP.md` for the complete Version 3 delivery plan.
