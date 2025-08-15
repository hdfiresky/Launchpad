
import React from 'react';
import type { AppDefinition } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface AppListItemProps {
    /** The application data to display. */
    app: AppDefinition;
    /** Callback function triggered when the info icon is clicked. */
    onInfoClick: (app: AppDefinition) => void;
}

/**
 * Renders a single application as a list item.
 * The entire item is a link that navigates to the app.
 * It includes an info icon to open a modal with the app's long description.
 */
export const AppListItem: React.FC<AppListItemProps> = ({ app, onInfoClick }) => {
    const handleInfoButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onInfoClick(app);
    };

    return (
        <a 
            href={app.href}
            className="group bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between no-underline"
        >
            <div className="flex items-center space-x-4 min-w-0">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                  <img src={app.iconUrl} alt={`${app.title} icon`} className="h-8 w-8 object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 truncate">{app.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{app.description}</p>
                </div>
            </div>
            <button
                onClick={handleInfoButtonClick}
                aria-label={`More info about ${app.title}`}
                className="p-2 ml-4 flex-shrink-0 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
                <InfoIcon className="h-5 w-5" />
            </button>
        </a>
    );
};
