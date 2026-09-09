# Quran Revision Mobile POC — Roadmap

**Last updated:** 9 September 2026  
**Current status:** Version 2 completed

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

**Status:** Planned

### Phase 1 — Manage Memorised Surahs

- [ ] Browse the full Surah catalogue
- [ ] Add a Surah to the user's memorised list
- [ ] Prevent duplicate memorisation records
- [ ] Remove a Surah with confirmation
- [ ] Display clear success, error, loading, and empty states

### Phase 2 — Local Persistence

- [ ] Introduce a storage service instead of accessing storage from UI components
- [ ] Persist memorisation records using AsyncStorage
- [ ] Restore records when the application starts
- [ ] Persist changes made after revision sessions
- [ ] Handle loading and storage failure states

### Phase 3 — Revision History

- [ ] Define a revision-history data model
- [ ] Create one history entry for every saved revision
- [ ] Persist revision history locally
- [ ] Display recent revision activity

### Phase 4 — Progress Insights

- [ ] Display weekly revision totals
- [ ] Display the distribution of Weak, Good, and Excellent Surahs
- [ ] Add one focused progress screen rather than a large dashboard

### Phase 5 — Release Preparation

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
