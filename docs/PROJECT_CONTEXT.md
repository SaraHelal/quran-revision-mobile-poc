# Quran Revision Mobile POC — Project Context

**Last updated:** 30 August 2026

## Overview

Quran Revision Mobile POC is a React Native proof of concept for a mobile Quran revision experience.

The project explores a focused revision workflow where users can see the Surahs that need revision, understand their current mastery level, and start a revision session from a simple mobile interface.

This repository is intentionally smaller in scope than the full Quran Revision web application.

## Purpose

The main goals of this POC are to:

- Explore React Native development using an existing product idea
- Design a mobile-first revision experience
- Build reusable and typed React Native components
- Demonstrate a focused end-to-end revision flow
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
  index.tsx

components/
  SurahCard.tsx

data/
  mockSurahs.ts

types/
  index.ts

docs/
  ROADMAP.md
  PROJECT_CONTEXT.md
```

### `app/`

Contains application screens and routing.

### `components/`

Contains reusable UI components such as `SurahCard`.

### `data/`

Contains temporary mock data used while developing the POC without a backend.

### `types/`

Contains shared TypeScript types such as `Surah` and `MasteryStatus`.

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

1. User opens Today's Revision.
2. The app displays Surahs due for revision.
3. Each Surah displays its mastery status.
4. User selects Start Revision.
5. The app will navigate to a revision session.

Steps 4–5 are the next part of Version 1 development.

## Key Engineering Decisions

### Mock Data First

The POC uses mock data instead of Firebase so that development can focus on React Native concepts and the mobile revision experience before introducing backend complexity.

### Reusable Components

Surah information is rendered through a reusable `SurahCard` component rather than duplicating UI for each Surah.

### Typed Domain Data

Shared TypeScript types define the expected shape of Surah and mastery data.

### FlatList for Revision Items

The revision list uses React Native's `FlatList`, making the implementation appropriate for potentially larger and scrollable collections.

### English-First POC

The initial POC interface is in English to keep the interview demo and technical discussion straightforward.

Arabic and RTL support are planned as a later enhancement.

## Scope

The current POC focuses on the core mobile revision experience.

It intentionally does not yet include:

- Authentication
- Firebase / Firestore
- Cloud synchronisation
- Analytics
- Full revision history
- Production-level scheduling

These features can be introduced after the core mobile revision flow is complete.

## Development Principles

- Build features incrementally
- Understand each React Native concept before adding complexity
- Keep components small and reusable
- Use TypeScript for clear data contracts
- Keep Version 1 focused on the core revision journey
- Avoid unnecessary backend complexity during the POC stage
