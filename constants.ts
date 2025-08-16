import type { AppDefinition } from "./types";

/**
 * An array of application definitions.
 * This is the central configuration for all the apps displayed on the homepage.
 * To add a new app, simply add a new object to this array following the AppDefinition interface.
 */
export const BASE_URL = "https://problembuddy.com";

export const APPS: AppDefinition[] = [
  {
    id: "dramaverse",
    title: "Dramaverse",
    description: "Find Korean, Chinese, or any other dramas.",
    longDescription:
      "Explore a vast universe of television dramas from across Asia and beyond. Get recommendations, read reviews, and find your next binge-worthy show with Dramaverse.",
    iconUrl: BASE_URL + "/dramaverse/pwa-512x512.png",
    href: "/dramaverse/",
  },
  {
    id: "novel-finder-pro",
    title: "Novel Finder Pro",
    description: "Find your next best web novel for your picking.",
    longDescription:
      "Discover your next favorite read with Novel Finder Pro. Our advanced algorithm helps you find hidden gems and popular web novels tailored to your unique taste.",
    iconUrl: BASE_URL + "/novel-finder-pro/pwa-512x512.png",
    href: "/novel-finder-pro/",
  },
  {
    id: "asset-generator",
    title: "Asset Generator Pro",
    description: "PWA & Extension Icon Sets from a single image.",
    longDescription:
      "Streamline your development workflow by generating complete icon sets for Progressive Web Apps (PWAs) and browser extensions from a single image. This tool automatically removes white backgrounds, previews the result, and generates all the necessary icon sizes in a downloadable zip file.",
    iconUrl: BASE_URL + "/asset-generator/pwa-512x512.png",
    href: "/asset-generator/",
  },
  {
    id: "epub-search",
    title: "Epub Search",
    description: "Search for keywords within your epub files.",
    longDescription:
      "Quickly locate specific information within your epub collection. Upload a book and search for keywords or phrases to find exactly what you're looking for in seconds.",
    iconUrl: BASE_URL + "/epub-search/pwa-512x512.png",
    href: "/epub-search/",
  },
  {
    id: "deploy-helper",
    title: "Problem Buddy Deployment Helper",
    description:
      "A demo app showcasing a secure, automated, zero-downtime deployment strategy for web applications.",
    longDescription:
      "This application is a comprehensive, interactive guide to a production-grade CI/CD pipeline. It showcases a robust architecture using GitHub Actions for automation, Nginx with a symbolic link strategy for zero-downtime deployments, and security best practices. Explore step-by-step guides for automated CI/CD, server-side scripting, or one-click Windows deployment, all designed for reliability and instant rollbacks.",
    iconUrl: BASE_URL + "/deploy-helper/pwa-512x512.png",
    href: "/deploy-helper/",
  },
  {
    id: "tutorial",
    title: "Multi-Agent Tutorial Generator",
    description:
      "Generate detailed tutorials on any topic using a collaborative multi-agent AI system.",
    longDescription:
      "This application leverages a simulated multi-agent system to automatically generate detailed tutorials. Simply provide a topic, and the AI agents will collaborate: Agent 1 creates a logical outline, Agent 4 researches current information if needed, Agent 2 writes the content for each section, and Agent 3 assembles and formats the final tutorial. Watch the process unfold in real-time through the activity log.",
    iconUrl: BASE_URL + "/tutorial/pwa-512x512.png",
    href: "/tutorial/",
  },
  {
    id: "epub-tagger",
    title: "Epub Tagger",
    description: "Automatically tag your uploaded epub novels.",
    longDescription:
      "Organize your digital library effortlessly. Upload your epub files and let our powerful algorithm analyze the content to assign relevant and accurate tags automatically.",
    iconUrl: BASE_URL + "/epub-tagger/pwa-512x512.png",
    href: "/epub-tagger/",
  },
  {
    id: "fleeting-notes",
    title: "Fleeting Notes",
    description: "Quick jots for passing thoughts or ideas.",
    longDescription:
      "Capture ideas as they occur—unstructured, instant, and meant to be processed or discarded shortly. Fleeting notes act as a temporary inbox of thoughts that may later evolve into refined, permanent knowledge.",
    iconUrl: BASE_URL + "/fleeting-notes/icons/Icon-512.png",
    href: "/fleeting-notes/",
  },
  {
    id: "novel-finder-pro",
    title: "Novel Finder Pro",
    description:
      "An advanced web application for searching, filtering, and sorting a collection of novels.",
    longDescription:
      "Discover your next favorite read with Novel Finder Pro. This tool features multi-level sorting, advanced filtering by genres, tags, and ratings, and a powerful recommendation engine. Users can create accounts to save favorites, write reviews, and maintain a personal wishlist, all within a sleek, responsive interface.",
    iconUrl: BASE_URL + "/novel-finder-pro/pwa-512x512.png",
    href: "/novel-finder-pro/",
  },
  {
    id: "ai-powered-task-manager",
    title: "AI-Powered Task Manager",
    description:
      "A smart task manager that uses AI to automatically break down large tasks into smaller, actionable steps.",
    longDescription:
      "Organize your workflow with an intelligent task management application. This app allows you to create, track, and prioritize tasks across different statuses like 'To Do', 'In Progress', and 'Done'. Its standout feature is an AI-powered capability, which leverages the Gemini API to analyze complex tasks and automatically suggest smaller, manageable sub-tasks, helping you improve productivity and tackle big projects with ease.",
    iconUrl: BASE_URL + '/ai-powered-task-manager/pwa-512x512.png',
    href: "/ai-powered-task-manager/",
  },
  {
    id: "video-to-learning-app",
    title: "Video to Learning App",
    description:
      "Instantly turn YouTube videos into fun learning apps using AI. Explore concepts visually and learn actively!",
    longDescription:
      "Transform any educational YouTube video into a hands-on learning experience. Paste a URL, and our AI will analyze the content to design and build a custom, interactive mini-app that helps you master the video's key concepts. You can play with the generated app, inspect its code, and even modify the AI's design specifications to create your own variations. It's a powerful and fun way to learn by doing.",
    iconUrl: BASE_URL + "/video-to-learning-app/pwa-512x512.png",
    href: "/video-to-learning-app/",
  },
];
