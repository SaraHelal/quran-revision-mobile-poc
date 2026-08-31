# Quran Revision Mobile POC — Roadmap

**Last updated:** 30 August 2026  
**Status:** In development

## Project Goal

Build a focused React Native proof of concept for a Quran revision experience.

The mobile POC explores how users can quickly see the Surahs due for revision, understand their current mastery level, and start a revision session from a simple mobile-first interface.

## Version 1 — Core Revision Flow

**Status:** In progress

- [x] Set up React Native with Expo and TypeScript
- [x] Create a clean project structure
- [x] Build the Today's Revision screen
- [x] Create a reusable `SurahCard` component
- [x] Define `Surah` and `MasteryStatus` types
- [x] Add mock revision data
- [x] Display mastery status dynamically
- [x] Render Surahs using `FlatList`
- [x] Add stable list keys and item separators
- [x] Support scrolling while keeping the screen header visible
- [x] Make the Start Revision action interactive
- [x] Add navigation to a revision session
- [x] Build the revision session screen
- [x] Add a dedicated session Surah summary
- [x] Add revision guidance before rating
- [x] Add Weak, Good, and Excellent result options
- [x] Reveal rating options after finishing the revision
- [x] Create reusable primary and secondary button components
- [x] Add shared mastery styling
- [x] Align the mobile UI with the web application's visual language
- [ ] Save the selected revision result
- [ ] Reflect the updated mastery status on the home screen
- [ ] Test and polish the complete Version 1 flow

## Version 2 — Revision Scheduling and Persistence

**Status:** Planned

- [ ] Calculate and display the next review date
- [ ] Add persistent revision data
- [ ] Add empty and completion states
- [ ] Improve revision feedback
- [ ] Add Arabic and RTL support
- [ ] Polish the UI for a mobile demo

## Future Ideas

These features are intentionally outside the initial POC scope:

- Firebase Authentication
- Cloud Firestore integration
- Persistent user data
- Full spaced-revision scheduling
- Revision history
- Progress statistics and analytics
- Synchronisation with the web application

## Development Principles

- Build features incrementally
- Understand each React Native concept before adding complexity
- Keep components small and reusable
- Use TypeScript for clear data contracts
- Keep Version 1 focused on the core revision journey
- Avoid unnecessary backend complexity during the POC stage
