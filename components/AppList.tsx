
import React from 'react';
import type { AppDefinition } from '../types';
import { AppListItem } from './AppListItem';

interface AppListProps {
    /** The list of applications to display. */
    apps: AppDefinition[];
    /** Callback function to handle when an app's info icon is clicked. */
    onInfoClick: (app: AppDefinition) => void;
}

/**
 * Displays a collection of applications in a vertical list.
 * It maps over the `apps` prop and renders an `AppListItem` for each one.
 */
export const AppList: React.FC<AppListProps> = ({ apps, onInfoClick }) => {
    return (
        <div className="space-y-4">
            {apps.map(app => (
                <AppListItem key={app.id} app={app} onInfoClick={onInfoClick} />
            ))}
        </div>
    );
};
