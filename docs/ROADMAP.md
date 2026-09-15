# Quran Revision Mobile POC — Roadmap

**Last updated:** 15 September 2026

**Current status:** Version 3 Phase 1 completed; Phase 2 planned

## Project Goal

Build a focused mobile Quran revision application that helps users organise memorised Surahs, identify what is due, complete revision sessions, and understand their progress.

## Version 1 — Core Revision Flow

**Status:** Completed

- [x] Set up React Native with Expo and TypeScript
- [x] Build the Today's Revision screen
- [x] Display Surahs with reusable cards and mastery states
- [x] Add file-based navigation with Expo Router
- [x] Build the revision session flow
- [x] Let users rate a revision as Weak, Good, or Excellent
- [x] Save session results to shared in-memory state
- [x] Display success feedback after saving
- [x] Protect unsaved revision progress
- [x] Handle invalid review routes gracefully

## Version 2 — Scheduling and Review Discovery

**Status:** Completed

- [x] Separate the static Surah catalogue from user memorisation records
- [x] Build complete memorised Surah objects from catalogue metadata and user records
- [x] Add Juz metadata to the Surah catalogue
- [x] Calculate the next review date from the mastery result
- [x] Identify Surahs that are due for revision
- [x] Distinguish between reviews due today and overdue reviews
- [x] Prioritise overdue Surahs in the suggested list
- [x] Add Suggested and Choose a Surah review modes
- [x] Add an empty state when no reviews are due
- [x] Add manual Surah search with normalised matching
- [x] Add Juz filtering with dynamically generated options
- [x] Add Latest Added and Weakest First sorting
- [x] Show the number of matching Surahs
- [x] Create a reusable application modal
- [x] Polish the mobile interface and compact tab labels
- [x] Move revision-saving logic into shared context

## Version 3 — Product-Ready Local Experience

**Status:** In progress

### Phase 1 — Manage Memorised Surahs

**Status:** Completed

- [x] Create a dedicated screen for managing memorised Surahs
- [x] Browse and search the available Surah catalogue
- [x] Display Surah and Juz metadata during selection
- [x] Add a Surah with its memorised date and mastery level
- [x] Prevent duplicate memorisation records
- [x] Display memorised Surahs with their metadata and mastery status
- [x] Sort newly added Surahs first
- [x] Edit a Surah's memorised date and mastery level
- [x] Remove a Surah with confirmation
- [x] Display success feedback after add, edit, and delete actions
- [x] Display an empty state when no Surahs are memorised
- [x] Handle invalid edit routes gracefully
- [x] Add direct navigation from the home screen
- [x] Verify the phase with TypeScript and manual device testing

### Phase 2 — Local Persistence

**Status:** Planned

- [ ] Introduce a storage service instead of accessing storage from UI components
- [ ] Persist memorisation records using AsyncStorage
- [ ] Restore records when the application starts
- [ ] Persist changes made after revision sessions
- [ ] Handle loading and storage failure states

### Phase 3 — Revision History

**Status:** Planned

- [ ] Define a revision-history data model
- [ ] Create one history entry for every saved revision
- [ ] Persist revision history locally
- [ ] Display recent revision activity

### Phase 4 — Progress Insights

**Status:** Planned

- [ ] Display weekly revision totals
- [ ] Display the distribution of Weak, Good, and Excellent Surahs
- [ ] Add one focused progress screen rather than a large dashboard

### Phase 5 — Release Preparation

**Status:** Planned

- [ ] Test the complete flow on a physical Android device
- [ ] Review accessibility and small-screen layouts
- [ ] Add an application icon and launch screen
- [ ] Create an installable Android build using EAS Build
- [ ] Share the build with external testers
- [ ] Add setup instructions and portfolio screenshots

## Later Versions

The following ideas are intentionally outside Version 3:

- User accounts and cloud synchronisation with Firebase
- Synchronisation with the Quran Revision web application
- Arabic localisation and RTL support
- Snoozing or deferring a suggested revision
- Configurable daily suggestion limits
- Audio recording and playback for self-assessed recitation
- Quran-specific speech recognition and automatic mistake detection

## Development Principles

- Deliver one complete user outcome at a time
- Prefer visible product milestones over prolonged UI polishing
- Keep components focused and reusable
- Keep domain logic outside presentation components
- Use TypeScript to make data contracts explicit
- Add backend complexity only when the product requires it
- Test behaviour before marking a phase as complete
