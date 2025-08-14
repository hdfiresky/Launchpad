
import React, { useState } from 'react';
import type { AppDefinition } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface AppListItemProps {
    /** The application data to display. */
    app: AppDefinition;
}

/**
 * Renders a single application as an expandable list item.
 * It shows the title and short description, and can be expanded to show the long description.
 * It provides a direct link to the app and a button to toggle the description.
 */
export const AppListItem: React.FC<AppListItemProps> = ({ app }) => {
    // State to manage the expanded/collapsed state of the item's long description.
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
            {/* The main clickable area to toggle the expansion */}
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} role="button" aria-expanded={isExpanded}>
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                      <img src={app.iconUrl} alt={`${app.title} icon`} className="h-8 w-8 object-contain" />
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100">{app.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{app.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                     {/* External link to open the application directly in a new tab */}
                     <a 
                        href={app.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        // Prevents the expansion toggle when clicking the direct link.
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label={`Open ${app.title}`}
                    >
                        <ExternalLinkIcon />
                    </a>
                    {/* The chevron icon that indicates expandability and rotates on state change. */}
                    <button className="p-2 text-slate-500 dark:text-slate-400" aria-label={isExpanded ? 'Collapse description' : 'Expand description'}>
                        <svg className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* The collapsible section containing the long description. Rendered conditionally. */}
            {isExpanded && (
                <div className="px-6 pb-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 pt-4">{app.longDescription}</p>
                </div>
            )}
        </div>
    );
};
