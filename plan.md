# Project Enhancement Plan: Problembuddy

This document outlines a strategic roadmap for enhancing the Problembuddy application. The plan is divided into milestones, each with distinct phases, to incrementally improve performance, user experience (UI/UX), accessibility, and the feature set.

---

## Milestone 1: Foundational Excellence (Accessibility, UX, and Code Quality)

*Focus: Address critical accessibility gaps, refine core user interactions, and establish a more robust development foundation.*

### Phase 1: Accessibility (A11y) Overhaul
- [x] **Modal Accessibility:**
    - [x] Implement a focus trap to contain keyboard navigation within the open modal.
    - [x] Add an event listener to close the modal when the `Escape` key is pressed.
    - [x] Ensure screen readers announce the modal title upon opening using `aria-labelledby`.
- [x] **Interaction Accessibility:**
    - [x] Conduct a full audit of keyboard navigation and focus states to ensure all interactive elements are reachable and clearly indicated.
    - [x] Add ARIA attributes to provide context for dynamic content changes.

### Phase 2: Core UX Refinements
- [x] **Improve Touch Device Interactions:**
    - [x] Reworked the `AppCard` component to make the "info" button always visible, removing the reliance on hover which is not available on touch devices.
- [x] **Implement Search & Filtering:**
    - [x] Added a search bar to filter applications by title and description in real-time.
    - [x] Implemented debouncing on the search input to optimize performance.
    - [x] Added a clear, user-friendly message when a search query yields no results.

### Phase 3: Developer Experience & Best Practices
- [ ] **Transition to a Bundler-Based Setup:**
    - [ ] Introduce a build tool like Vite to manage dependencies via `package.json`.
    - [ ] This enables performance optimizations like tree-shaking, minification, and CSS purging, and aligns with the existing `CI-CD-PIPELINE.md`.
    - [ ] Move inline Tailwind CSS configuration to a `tailwind.config.js` file.

---

## Milestone 2: Personalization & Organization

*Focus: Empower users to customize the dashboard to their personal workflow and organize the growing list of applications.*

### Phase 1: Favorites System
- [ ] **Implement "Favorite" Functionality:**
    - [ ] Add a "favorite" toggle button (e.g., a star icon) to each `AppCard` and `AppListItem`.
    - [ ] Persist the user's list of favorite apps using the `useLocalStorage` hook.
    - [ ] Display a dedicated "Favorites" section at the top of the application list for quick access. This section should be hidden if no apps are favorited.

### Phase 2: App Categorization
- [ ] **Introduce App Categories:**
    - [ ] Update the `AppDefinition` type to include an optional `category` string.
    - [ ] Update `constants.ts` to assign a category to each application (e.g., "Content Discovery", "Developer Tools").
    - [ ] Rework the main view to render applications grouped under their respective category headings, improving scannability.
- [ ] **Add Category Filters:**
    - [ ] Implement filter buttons or a dropdown to allow users to view only apps from a specific category.

---

## Milestone 3: Advanced Customization & Performance Scaling

*Focus: Transform Problembuddy into a fully dynamic platform and ensure it remains fast and responsive as its feature set expands.*

### Phase 1: Dynamic Dashboard
- [ ] **User-Defined Apps:**
    - [ ] Create a feature allowing users to add their own custom application links via a form/modal.
    - [ ] Store, display, edit, and delete user-added apps, persisting them in `localStorage`.
- [ ] **Drag-and-Drop Reordering:**
    - [ ] Integrate a lightweight, accessible drag-and-drop library (e.g., `dnd-kit`) to allow users to reorder apps.
    - [ ] Persist the custom sort order in `localStorage` for both the main list and the favorites section.

### Phase 2: Performance Optimization
- [ ] **Asset Loading:**
    - [ ] Implement lazy loading for all application icon images (`<img loading="lazy">`) to improve initial page load speed.
- [ ] **UI Virtualization:**
    - [ ] For long lists of applications, implement UI virtualization (e.g., using `tanstack-virtual`) to render only the items visible in the viewport, drastically improving rendering performance.

### Phase 3: Future-Proofing
- [ ] **Dynamic App Configuration:**
    - [ ] Move the application list from a static `constants.ts` file to a remote `apps.json` file.
    - [ ] Fetch the app list asynchronously on component mount, allowing for updates to the app list without requiring a full redeployment of the application.
- [ ] **Code Splitting:**
    - [ ] As new "pages" or complex modals (like the "Add App" form) are introduced, use `React.lazy` and `Suspense` to split them into separate JavaScript chunks, reducing the initial bundle size.