# Quran Revision Mobile POC — Roadmap

**Last updated:** 22 September 2026

**Current status:** Version 3 Phase 2 completed; Phase 3 planned

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

**Status:** Completed

- [x] Install and configure AsyncStorage
- [x] Introduce a storage service instead of accessing storage from UI components
- [x] Persist memorisation records using AsyncStorage
- [x] Restore memorisation records when the application starts
- [x] Persist added, edited, and deleted Surahs
- [x] Persist mastery and scheduling changes after revision sessions
- [x] Display a loading state while stored records are restored
- [x] Handle storage reading and writing failures
- [x] Keep stored data separate from the static Surah catalogue
- [x] Start new installations with an empty memorised Surah list
- [x] Preserve an intentionally empty list instead of restoring mock data
- [x] Verify persistence after fully closing and reopening the application
- [x] Verify the phase with TypeScript and physical-device testing

### Phase 3 — Revision History

**Status:** Planned

- [ ] Define a revision-history data model
- [ ] Create one history entry for every saved revision
- [ ] Store the Surah, mastery result, and revision date in each entry
- [ ] Create a dedicated revision-history storage service
- [ ] Persist revision history locally
- [ ] Restore revision history when the application starts
- [ ] Display recent revision activity
- [ ] Add an empty state when no revisions have been completed
- [ ] Handle history loading and storage failure states

### Phase 4 — Simple Analytics

**Status:** Planned

- [ ] Calculate weekly revision totals from revision history
- [ ] Calculate the distribution of Weak, Good, and Excellent results
- [ ] Display a small set of useful progress metrics
- [ ] Add one simple chart
- [ ] Create one focused progress screen instead of a large dashboard
- [ ] Handle empty analytics when there is not enough history

### Phase 5 — Polish, Testing, and Portfolio Release

**Status:** In progress

- [x] Configure EAS Build for Android
- [x] Create an installable Android preview build
- [ ] Test the latest build across the complete user flow on a physical Android device
- [ ] Review first-use, empty, success, loading, and error states
- [ ] Review accessibility and small-screen layouts
- [ ] Add a custom application icon and launch screen
- [ ] Share the Android build with external testers
- [ ] Collect and prioritise tester feedback
- [ ] Fix high-priority usability and stability issues
- [ ] Add setup and build instructions to the README
- [ ] Add portfolio screenshots
- [ ] Prepare a concise technical and product case study

## After Version 3

After the product milestone is complete:

- Prepare a short project walkthrough
- Practise explaining the product problem and technical decisions
- Prepare for React Native and frontend interview questions
- Update the CV and portfolio with the completed project
- Use the working prototype when contacting relevant Quran technology teams

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
- Keep analytics focused on decisions that help the user
- Avoid expanding the scope before validating the current product
