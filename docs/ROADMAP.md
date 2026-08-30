# Quran Revision Mobile POC — Roadmap

**Last updated:** 30 August 2026  
**Status:** In development

## Project Goal

Build a focused React Native proof of concept for a Quran revision experience.

The mobile POC explores how users can quickly see the Surahs due for revision, understand their current mastery level, and start a revision session from a simple mobile-first interface.

## Version 1 — Revision List

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
- [ ] Make the Start Revision button interactive
- [ ] Add navigation to a revision session
- [ ] Build the first revision session screen
- [ ] Test and polish the complete Version 1 flow

## Version 2 — Revision Experience

**Status:** Planned

- [ ] Record a revision result
- [ ] Update mastery status after revision
- [ ] Calculate and display the next review date
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
