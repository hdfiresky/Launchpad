import type { AppDefinition } from './types';

/**
 * An array of application definitions.
 * This is the central configuration for all the apps displayed on the homepage.
 * To add a new app, simply add a new object to this array following the AppDefinition interface.
 */
export const APPS: AppDefinition[] = [
  {
    id: 'dramaverse',
    title: 'Dramaverse',
    description: 'Find Korean, Chinese, or any other dramas.',
    longDescription: 'Explore a vast universe of television dramas from across Asia and beyond. Get recommendations, read reviews, and find your next binge-worthy show with Dramaverse.',
    iconUrl: 'https://i.ibb.co/hKqzD8W/drama-icon.png',
    href: '/dramaverse'
  },
  {
    id: 'novel-finder-pro',
    title: 'Novel Finder Pro',
    description: 'Find your next best web novel for your picking.',
    longDescription: 'Discover your next favorite read with Novel Finder Pro. Our advanced algorithm helps you find hidden gems and popular web novels tailored to your unique taste.',
    iconUrl: 'https://i.ibb.co/L5hYhL9/novel-icon.png',
    href: '/novel-finder-pro'
  },
  {
    id: 'epub-tagger',
    title: 'Epub Tagger',
    description: 'Automatically tag your uploaded epub novels.',
    longDescription: 'Organize your digital library effortlessly. Upload your epub files and let our powerful algorithm analyze the content to assign relevant and accurate tags automatically.',
    iconUrl: 'https://i.ibb.co/Q8Q2vGj/tag-icon.png',
    href: '/epub-tagger'
  },
  {
    id: 'epub-finder',
    title: 'Epub Finder',
    description: 'Search for keywords within your epub files.',
    longDescription: 'Quickly locate specific information within your epub collection. Upload a book and search for keywords or phrases to find exactly what you\'re looking for in seconds.',
    iconUrl: 'https://i.ibb.co/Xz9Z2fD/search-epub-icon.png',
    href: '/epub-finder'
  }
];