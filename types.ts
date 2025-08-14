
/**
 * Defines the structure for an application that can be displayed on the homepage.
 */
export interface AppDefinition {
  /** A unique string to identify the application. Used as a key and for local storage. */
  id: string;
  /** The main title of the application. */
  title: string;
  /** A short, one-line summary of the application. */
  description: string;
  /** A longer, more detailed description for expanded views or modals. */
  longDescription: string;
  /** The public URL of the icon image for the application. */
  iconUrl: string;
  /** The destination URL when the application is launched. */
  href: string;
}

/**
 * Represents the available view modes for displaying the list of applications.
 */
export type ViewMode = 'grid' | 'list';
