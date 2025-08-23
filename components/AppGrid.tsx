
import React from 'react';
import type { AppDefinition } from '../types';
import { AppCard } from './AppCard';

interface AppGridProps {
    /** The list of applications to display. */
    apps: AppDefinition[];
    /** Callback function to handle when an app's info icon is clicked. */
    onInfoClick: (app: AppDefinition) => void;
    /** An array of favorite application IDs. */
    favoriteAppIds: string[];
    /** Callback function to toggle an app's favorite status. */
    onToggleFavorite: (appId: string) => void;
}

/**
 * Displays a collection of applications in a responsive grid layout.
 * It maps over the `apps` prop and renders an `AppCard` for each one.
 */
export const AppGrid: React.FC<AppGridProps> = ({ apps, onInfoClick, favoriteAppIds, onToggleFavorite }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map(app => (
                <AppCard 
                    key={app.id} 
                    app={app} 
                    onInfoClick={onInfoClick} 
                    isFavorite={favoriteAppIds.includes(app.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};
