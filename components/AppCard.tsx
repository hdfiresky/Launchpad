
import React from 'react';
import type { AppDefinition } from '../types';

interface AppCardProps {
    /** The application data to display. */
    app: AppDefinition;
    /** Callback function triggered when the card is clicked. */
    onAppClick: (app: AppDefinition) => void;
}

/**
 * A presentational component for a single application in the grid view.
 * Displays the app's icon, title, and short description in a card format.
 * Includes a subtle lift-and-scale hover effect for better user interaction.
 */
export const AppCard: React.FC<AppCardProps> = ({ app, onAppClick }) => {
    return (
        <div 
            onClick={() => onAppClick(app)}
            // Role 'button' and tabIndex are added for accessibility, making the div focusable and identifiable as a clickable element.
            role="button"
            tabIndex={0}
            onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onAppClick(app)}
            className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-brand-primary/20 cursor-pointer transition-[transform,box-shadow] duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="h-16 w-16 mb-4 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 group-hover:bg-brand-primary/10 transition-colors">
                    <img src={app.iconUrl} alt={`${app.title} icon`} className="h-10 w-10 object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{app.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{app.description}</p>
            </div>
        </div>
    );
};