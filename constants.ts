
import type { AppDefinition } from './types';

/**
 * An array of application definitions.
 * This is the central configuration for all the apps displayed on the homepage.
 * To add a new app, simply add a new object to this array following the AppDefinition interface.
 */
export const APPS: AppDefinition[] = [
  {
    id: 'google-search',
    title: 'Google Search',
    description: 'The world\'s most popular search engine.',
    longDescription: 'Access the full power of Google Search to find information, images, videos, and more. Google\'s mission is to organize the world\'s information and make it universally accessible and useful.',
    iconUrl: 'https://i.ibb.co/bF00tqr/google-icon.png',
    href: 'https://www.google.com'
  },
  {
    id: 'microsoft-bing',
    title: 'Microsoft Bing',
    description: 'Discover a new way to search.',
    longDescription: 'Microsoft Bing helps you turn information into action, making it faster and easier to go from searching to doing. It integrates AI-powered features for a more comprehensive search experience.',
    iconUrl: 'https://i.ibb.co/kKWBpYG/bing-icon.png',
    href: 'https://www.bing.com'
  },
  {
    id: 'wikipedia',
    title: 'Wikipedia',
    description: 'The free encyclopedia.',
    longDescription: 'Wikipedia is a multilingual free online encyclopedia written and maintained by a community of volunteers through open collaboration and a wiki-based editing system. It is the largest and most-read reference work in history.',
    iconUrl: 'https://i.ibb.co/GvxYpS4/wikipedia-icon.png',
    href: 'https://www.wikipedia.org'
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Where the world builds software.',
    longDescription: 'GitHub is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management functionality of Git, plus its own features.',
    iconUrl: 'https://i.ibb.co/Ny2xsmR/github-icon.png',
    href: 'https://www.github.com'
  }
];
