# 🚀 Problembuddy - Your Personal Application Launchpad

<p align="center">
  <img src="https://i.ibb.co/3k8gZzK/problembuddy-screenshot.png" alt="A screenshot of the Problembuddy application dashboard shown in dark mode, with a grid of application cards." width="800"/>
</p>

<p align="center">
  <em>A sleek, modern, and highly customizable homepage for all your essential web applications and tools.</em>
</p>

<p align="center">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/google/generative-ai-docs?style=for-the-badge&color=4f46e5">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/google/generative-ai-docs?style=for-the-badge&color=10b981">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge">
</p>

---

Problembuddy acts as your personal launchpad, providing a clean and organized dashboard to access your digital toolkit, from search engines to development platforms. Say goodbye to cluttered bookmarks and hello to a streamlined, efficient workflow.

## ✨ Core Features

-   **Centralized Dashboard:** All your favorite apps in one place for quick and easy access.
-   **Dual View Modes:** Seamlessly switch between a beautiful `Grid View` and a detailed `List View` to suit your preference.
-   **Rich App Previews:** Get a detailed description of an app *before* you open it, thanks to an elegant pop-up modal.
-   **Smart Memory:** Use the "Don't show this again" option to bypass the description modal for apps you use frequently. Your choice is saved locally.
-   **Fully Responsive:** Looks and works great on any device, from large desktop monitors to mobile phones.
-   **Modern & Themed:** Features a clean design with both **Light** and **Dark Mode** support, adapting to your system settings.
-   **Easily Customizable:** Add your own apps or change the logo by editing a single configuration file. No complex setup required!

## 💻 Tech Stack

This project is built with a modern, performant, and type-safe technology stack:

-   **React:** For building a fast and interactive user interface.
-   **TypeScript:** For robust, scalable, and maintainable code.
-   **Tailwind CSS:** For rapid, utility-first styling and a beautiful, custom design.

## 🔧 Customization Guide

Making Problembuddy your own is simple. Here’s how you can add new apps or change the logo.

<details>
  <summary><strong>How to Add a New Application</strong></summary>

  <br>

  Adding a new web application requires editing only one file.

  1.  **Locate the Configuration File**: All application definitions are stored in the `src/constants.ts` file.
  2.  **Add Your App Object**: Add a new object to the `APPS` array. Each object must follow the `AppDefinition` structure, with these recommendations for content:

      ```typescript
      // src/constants.ts
      {
        id: string;              // A unique identifier (e.g., 'my-new-app').
        title: string;           // The app name. Keep it concise (e.g., "Google Search").
        description: string;     // A short summary. Ideal length: 5-10 words (e.g., "The world's most popular search engine.").
        longDescription: string; // A detailed description for modals/expanded views. Ideal length: 2-4 sentences.
        iconUrl: string;         // URL for the app icon. Recommended: A square image (e.g., 128x128px) with a transparent background.
        href: string;            // The destination URL. Can be an absolute URL or a relative path.
      }
      ```

  3.  **Example (External Link)**: To add a link to DEV Community, you would add this to the `APPS` array:

      ```typescript
      // in src/constants.ts
      {
        id: 'dev-community',
        title: 'DEV Community',
        description: 'Where programmers share ideas.',
        longDescription: 'A constructive and inclusive social network for software developers. With you every step of your journey.',
        iconUrl: 'https://i.ibb.co/7jZ0x0L/dev-icon.png',
        href: 'https://dev.to'
      }
      ```
    > **💡 Pro Tip:** For icons, use square images with a transparent background. You can upload them to a free image hosting service like [ImgBB](https://imgbb.com/) to get a direct link.
    
  4. **Example (Relative Path)**: You can also link to pages within your own site by using a relative path for the `href` property. This is useful for linking to other tools or pages hosted on the same domain. To add a link to an internal "About Us" page located at `/about.html`:

      ```typescript
      // in src/constants.ts
      {
        id: 'about-us',
        title: 'About Us',
        description: 'Learn more about our mission.',
        longDescription: 'Discover the story behind Problembuddy and the team dedicated to building helpful tools for everyone.',
        iconUrl: '/icons/about-us-icon.svg', // An icon stored locally in your public folder
        href: '/about.html' // A relative path to an internal page
      }
      ```

</details>

<details>
  <summary><strong>How to Change the Logo</strong></summary>

  <br>

  The main logo in the header is located in the `src/components/Header.tsx` file.

  1.  **Open the Header Component**: Navigate to `src/components/Header.tsx`.
  2.  **Replace the SVG**: Find the `<svg>` element. You can replace it with your own SVG code or an `<img>` tag.
      -   **Logo Size:** The logo is displayed at 32x32 pixels (`h-8 w-8` in Tailwind CSS). For best results, use a **square logo** (1:1 aspect ratio) with a transparent background. An image size of at least **64x64 pixels** is recommended to ensure it looks sharp.
  3.  **Example using an `<img>` tag**:

      ```jsx
      // src/components/Header.tsx
      <div className="flex items-center space-x-3">
          {/* Replace the SVG with an <img> tag */}
          <img src="/your-logo.png" alt="Problembuddy Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold ...">Problembuddy</span>
      </div>
      ```

</details>

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
