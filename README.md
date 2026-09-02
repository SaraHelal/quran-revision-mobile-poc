# Quran Revision Mobile POC

A React Native proof of concept for a focused Quran revision experience.

The app helps users identify Surahs that are due for revision, see their current mastery level, start a revision session, revise from memory, and rate the result.

This project is a mobile exploration of the broader Quran Revision App concept. It keeps the initial scope intentionally focused on the core revision journey while adapting the existing web experience for mobile.

## Current Status

**Version 1 — Core Revision Flow is complete.**

The current implementation includes:

- Today's Revision home screen
- Mobile-first revision list
- Reusable Surah cards
- Weak, Good, and Excellent mastery states
- Shared mastery status styling
- Scrollable revision list using `FlatList`
- Dynamic revision session routes using Expo Router
- Dedicated revision session screen
- Revision guidance before rating
- Progressive revision flow
- Weak, Good, and Excellent result selection
- Reusable primary and secondary buttons
- TypeScript domain models
- Mock revision data
- Mobile UI inspired by the Quran Revision web application
- Shared Surah state using React Context
- Custom `useSurahs` hook for accessing revision state
- Revision result saving
- Immediate mastery status updates on the home screen
- Success feedback containing the revised Surah name
- Automatic success message dismissal after three seconds
- Protection against accidentally leaving a revision with unsaved progress
- Native confirmation before discarding unsaved revision progress
- Android hardware back protection
- Graceful handling of invalid review route IDs
- Reusable not-found state

The complete Version 1 revision flow is functional and has been tested using shared in-memory state.

Persistent storage is intentionally outside the Version 1 scope. Reloading or restarting the application currently resets Surah data to the mock values.

## Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context
- React Native `StyleSheet`

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
  review/
    [id].tsx

components/
  NotFoundState.tsx
  PrimaryButton.tsx
  SecondaryButton.tsx
  SessionSurahInfo.tsx
  SurahCard.tsx
  SurahSummary.tsx

constants/
  masteryStyles.ts

context/
  SurahsContext.tsx

data/
  mockSurahs.ts

types/
  index.ts

docs/
  ROADMAP.md
  PROJECT_CONTEXT.md
```

## Core Revision Flow

The current mobile experience follows this flow:

1. Open Today's Revision.
2. View Surahs that are due for revision.
3. See the current mastery status for each Surah.
4. Select Start Revision.
5. Open a dedicated revision session.
6. Revise the Surah from memory.
7. Select Finish Revision.
8. Rate the revision as Weak, Good, or Excellent.
9. Save the revision result.
10. Return automatically to Today's Revision.
11. See the updated mastery status immediately.
12. Receive a success message confirming which Surah was updated.

If the user attempts to leave after finishing a revision but before saving the result, the app displays a confirmation alert before discarding the unsaved progress.

## UI and Product Direction

The mobile POC is based on the same product concept as the Quran Revision web application.

The two experiences share a visual language that includes:

- Green primary branding
- Soft green revision cards
- Consistent mastery status colours
- Rounded interface elements
- Clear revision-focused information hierarchy

The React Native version is not intended to be a direct copy of the web interface. Navigation, spacing, hierarchy, and interactions are adapted for a mobile experience.

The initial POC uses English for a straightforward technical demonstration. Arabic and RTL support are planned for a later version.

## Development Approach

The project is being developed incrementally.

Version 1 intentionally uses mock data and in-memory state instead of backend infrastructure so development can focus on:

- React Native fundamentals
- Mobile UI and interaction
- Component composition
- Reusable UI components
- Type-safe domain data
- Navigation
- Shared application state
- A clear end-to-end revision workflow
- Defensive navigation and error states

Backend infrastructure and persistence can be introduced in a later version without expanding the initial POC unnecessarily.

## Version 1 Testing

The core Version 1 flow has been manually tested for:

- Starting a revision session
- Revealing rating options after finishing a revision
- Selecting and saving a mastery result
- Reflecting the updated mastery status on the home screen
- Displaying and automatically dismissing success feedback
- Leaving a revision before any meaningful progress without a warning
- Protecting unsaved revision progress with a confirmation alert
- Leaving without saving while preserving the previous mastery status
- Returning normally after a successful save
- Android hardware back behaviour
- Invalid review route IDs
- Reload behaviour with in-memory mock data
- Lint validation with no remaining errors or warnings

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

## Documentation

- [`docs/ROADMAP.md`](docs/ROADMAP.md) — development progress and planned versions
- [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — architecture, scope, user flow, and engineering decisions

## Future Direction

Potential future development includes:

- Persistent user data
- Firebase Authentication
- Cloud Firestore integration
- Spaced revision scheduling
- Next review dates
- Revision history
- Progress statistics and analytics
- Arabic localisation
- RTL support
- Synchronisation with the Quran Revision web application

## Related Project

This repository is a focused mobile proof of concept based on the broader Quran Revision App.

The web application contains a more complete memorisation management and revision scheduling workflow.
