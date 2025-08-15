
import React from 'react';
import type { AppDefinition } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface AppCardProps {
    /** The application data to display. */
    app: AppDefinition;
    /** Callback function triggered when the info icon is clicked. */
    onInfoClick: (app: AppDefinition) => void;
}

/**
 * A presentational component for a single application in the grid view.
 * The entire card is a link that navigates to the app.
 * It includes an info icon to open a modal with more details.
 */
export const AppCard: React.FC<AppCardProps> = ({ app, onInfoClick }) => {
    const handleInfoButtonClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling to the parent link
        onInfoClick(app);
    };

    return (
        <a 
            href={app.href}
            className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-brand-primary/20 cursor-pointer transition-[transform,box-shadow] duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] border border-slate-200 dark:border-slate-700 overflow-hidden no-underline flex flex-col"
        >
            <div className="flex flex-col items-center justify-center p-6 text-center flex-grow">
                <div className="h-16 w-16 mb-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 group-hover:bg-brand-primary/10 transition-colors">
                    <img src={app.iconUrl} alt={`${app.title} icon`} className="h-10 w-10 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{app.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{app.description}</p>
            </div>
            <button
                onClick={handleInfoButtonClick}
                aria-label={`More info about ${app.title}`}
                className="absolute top-2 right-2 p-2 rounded-full text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-slate-200/70 dark:hover:bg-slate-700/70 hover:text-slate-700 dark:hover:text-slate-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
                <InfoIcon className="h-5 w-5" />
            </button>
        </a>
    );
};
