# Quran Revision Mobile POC — Project Context

**Last updated:** 31 August 2026

## Overview

Quran Revision Mobile POC is a React Native proof of concept for a mobile Quran revision experience.

The project explores a focused revision workflow where users can see the Surahs that need revision, understand their current mastery level, start a revision session, revise from memory, and rate the result.

This repository is intentionally smaller in scope than the full Quran Revision web application while keeping a similar product identity and revision experience.

## Purpose

The main goals of this POC are to:

- Explore React Native development using an existing product idea
- Design a focused mobile-first Quran revision experience
- Build reusable and typed React Native components
- Demonstrate an end-to-end revision flow
- Keep the mobile experience visually connected to the Quran Revision web application
- Keep the architecture simple enough to iterate quickly

## Technology Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Native `StyleSheet`
- Mock data during the initial POC

## Current Architecture

```text
app/
  _layout.tsx
  index.tsx
  review/
    [id].tsx

components/
  PrimaryButton.tsx
  SecondaryButton.tsx
  SessionSurahInfo.tsx
  SurahCard.tsx
  SurahSummary.tsx

constants/
  masteryStyles.ts

data/
  mockSurahs.ts

types/
  index.ts

docs/
  ROADMAP.md
  PROJECT_CONTEXT.md

context/
  SurahsContext.tsx
```

### `app/`

Contains application screens and routing.

`index.tsx` displays the Today's Revision screen.

`review/[id].tsx` is a dynamic route used for individual revision sessions.

### `components/`

Contains reusable UI components.

Current shared components include:

- `SurahCard` for displaying a Surah in the revision list
- `SurahSummary` for reusable Surah information inside list cards
- `SessionSurahInfo` for highlighting the active Surah during a revision session
- `PrimaryButton` for primary actions such as finishing a revision
- `SecondaryButton` for secondary actions such as starting a revision

### `constants/`

Contains shared UI and domain constants.

`masteryStyles.ts` defines the colours used for Weak, Good, and Excellent mastery states so that they remain visually consistent throughout the application.

### `data/`

Contains temporary mock data used while developing the POC without a backend.

### `types/`

Contains shared TypeScript domain types such as `Surah` and `MasteryStatus`.

### `docs/`

Contains project documentation, development plans, architecture decisions, and project context.

## Current Data Model

A Surah used by the revision UI currently contains:

- `id`
- `surahName`
- `surahNumber`
- `status`

Mastery status is currently limited to:

- `Weak`
- `Good`
- `Excellent`

## Current User Flow

1. The user opens Today's Revision.
2. The app displays Surahs due for revision.
3. Each Surah displays its current mastery status.
4. The user selects Start Revision.
5. Expo Router navigates to a dedicated revision session using the Surah ID.
6. The active Surah and its current mastery status are displayed.
7. The user is prompted to revise the Surah from memory.
8. The user selects Finish Revision after completing the revision.
9. Weak, Good, and Excellent rating options are revealed.
10. The user selects a revision result.
11. The selected mastery status is saved to shared application state.
12. The app returns to the home screen.
13. The updated mastery status is immediately reflected in the Surah card.
14. A success message containing the Surah name is displayed.
15. The success message disappears automatically after three seconds.

## Key Engineering Decisions

### Shared Surah State

Surah data is managed through `SurahsContext` so that the home screen and revision session share the same source of truth.

The provider owns the Surah state, while a custom `useSurahs` hook gives screens access to the shared data and update functions.

This allows a revision result saved from the revision screen to be immediately reflected on the home screen without passing state through route parameters.

### Temporary Success Feedback

Revision success feedback is stored in shared context because the revision screen navigates back to the home screen immediately after saving.

The home screen displays the message and uses `useEffect` with a timer cleanup to remove it automatically after three seconds.

### Mock Data First

The POC uses mock data instead of Firebase so that development can focus on React Native concepts and the mobile revision experience before introducing backend complexity.

### Reusable Components

Repeated interface elements are extracted into focused reusable components instead of duplicating UI between screens.

Screen components remain responsible for page-level layout and behaviour, while reusable components handle their own presentation and interaction.

### Separate List and Session Presentation

The Surah list and revision session have different visual requirements.

`SurahSummary` is designed for compact Surah information inside list cards, while `SessionSurahInfo` gives the active Surah stronger visual hierarchy during a revision session.

This avoids forcing a single component to support unrelated layouts.

### Reusable Button Components

Primary and secondary actions use separate reusable button components.

`PrimaryButton` represents the main action in a flow, while `SecondaryButton` is used for less prominent actions such as starting a revision from a Surah card.

The components are intentionally kept simple while the design system remains small.

### Shared Mastery Styling

Weak, Good, and Excellent colours are defined centrally in `constants/masteryStyles.ts`.

This avoids duplicating colour definitions and keeps mastery states visually consistent across the home screen and revision session.

### FlatList for Revision Items

The revision list uses React Native's `FlatList`, making the implementation suitable for larger and scrollable collections.

Stable IDs are used as list keys, and item separators control spacing between Surah cards.

### File-Based Navigation

Expo Router provides file-based navigation.

The dynamic route:

```text
review/[id].tsx
```

allows each revision session to receive the selected Surah ID and load the appropriate Surah from the current data source.

### Progressive Revision Flow

Rating options are not displayed immediately when a revision session begins.

The user first revises the Surah and selects Finish Revision. The Weak, Good, and Excellent rating options are then revealed.

This keeps the interface focused on the current step of the revision process.

### Mobile and Web Product Consistency

The mobile POC follows the visual language of the Quran Revision web application, including:

- Green primary branding
- Soft green Surah cards
- Consistent mastery colours
- Rounded interface elements
- Clear revision-focused information hierarchy

The mobile interface is not intended to be a pixel-for-pixel copy of the web application. Layout and navigation are adapted to common mobile interaction patterns.

### English-First POC

The initial POC interface is in English to keep the technical demonstration and interview discussion straightforward.

Arabic and RTL support are planned as a later enhancement.

## Current Scope

The current POC focuses on a complete core revision flow, from selecting a Surah through completing a revision session and rating the result.

The core Version 1 revision journey is now functional using in-memory shared state. The remaining Version 1 work focuses on testing and UI polish before introducing persistence and more advanced revision scheduling.

The POC intentionally does not yet include:

- Authentication
- Firebase / Firestore
- Cloud synchronisation
- Persistent revision history
- Production-level spaced revision scheduling
- Analytics and progress charts
- Arabic and RTL localisation

These features can be introduced after the core mobile revision flow is complete.

## Development Principles

- Build features incrementally
- Understand each React Native concept before adding complexity
- Keep components small and focused
- Extract reusable UI only when there is a clear reuse case
- Use TypeScript for clear data contracts
- Keep Version 1 focused on the complete core revision journey
- Keep mobile and web experiences visually connected
- Avoid unnecessary backend complexity during the POC stage
- Avoid premature abstraction and overengineering
