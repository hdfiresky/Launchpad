# Customizing Problembuddy

This guide explains how to add new applications to the Problembuddy homepage and how to change the main logo.

---

## 1. Adding a New Application

Adding a new web application is straightforward and requires editing only one file.

### Step 1: Locate the Application Constants File

All application definitions are stored in an array within the `src/constants.ts` file. Open this file in your editor.

### Step 2: Understand the Application Structure

Each application is an object that conforms to the `AppDefinition` interface (defined in `src/types.ts`). The structure is as follows:

```typescript
{
  id: string;              // A unique identifier for the app. Used for local storage.
  title: string;           // The main name of the app (e.g., "Google Search").
  description: string;     // A short, one-line summary for the card/list view.
  longDescription: string; // A more detailed description for the modal or expanded view.
  iconUrl: string;         // A direct URL to the application's icon image.
  href: string;            // The URL the user will be sent to when they click the app.
}
```

### Step 3: Add Your New App

To add your application, simply add a new object to the `APPS` array in `src/constants.ts`.

**Example: Adding YouTube**

Let's say you want to add a link to YouTube. You would add the following object to the `APPS` array:

```typescript
// in src/constants.ts

import type { AppDefinition } from './types';

export const APPS: AppDefinition[] = [
  // ... existing apps
  {
    id: 'google-search',
    title: 'Google Search',
    // ...
  },
  // ... more existing apps
  {
    id: 'youtube', // <-- Unique ID
    title: 'YouTube', // <-- App Title
    description: 'Watch, stream, and share videos.', // <-- Short description
    longDescription: 'YouTube is a global online video sharing and social media platform. It allows users to upload, view, rate, share, add to playlists, report, comment on videos, and subscribe to other users.', // <-- Detailed description
    iconUrl: 'https://i.ibb.co/6wFw7gC/youtube-icon.png', // <-- Icon URL (example)
    href: 'https://www.youtube.com' // <-- Link to the app
  },
];
```

**Important Notes:**
- **`id`**: Must be unique for each application. This is used internally to track settings like "Don't show this again".
- **`iconUrl`**: For best results, use a square image (e.g., 128x128 pixels) with a transparent background. You can upload icons to an image hosting service like [ImgBB](https://imgbb.com/) to get a direct link.

---

## 2. Changing the Logo

The main logo in the header can be easily customized.

### Step 1: Locate the Header Component

The logo is defined inside the `src/components/Header.tsx` file.

### Step 2: Replace the SVG

Inside the `Header` component, you will find an `<svg>` element that draws the current logo.

```jsx
// src/components/Header.tsx

<div className="flex items-center space-x-3">
    {/* This is the logo SVG. Replace it with your own. */}
    <svg className="h-8 w-8 text-brand-primary" ...>
       <path ... />
    </svg>
    <span ...>Problembuddy</span>
</div>
```

You have two options:

**Option A: Replace with another SVG**
If you have a new SVG logo, simply replace the entire `<svg>...</svg>` block with your new SVG code. Make sure to keep the `className` attribute to maintain proper sizing and color.

**Option B: Replace with an Image (`<img>`)**
If you have a logo in a standard image format (like PNG or JPG), you can replace the `<svg>` with an `<img>` tag.

**Example using an `<img>` tag:**

```jsx
// src/components/Header.tsx

<div className="flex items-center space-x-3">
    {/* Replace the SVG with an <img> tag */}
    <img src="/your-logo.png" alt="Problembuddy Logo" className="h-8 w-8" />
    <span ...>Problembuddy</span>
</div>
```

This will update the logo in the application's header.
