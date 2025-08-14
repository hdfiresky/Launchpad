
import React from 'react';
import type { AppDefinition } from '../types';
import { AppListItem } from './AppListItem';

interface AppListProps {
    /** The list of applications to display. */
    apps: AppDefinition[];
}

/**
 * Displays a collection of applications in a vertical list.
 * It maps over the `apps` prop and renders an `AppListItem` for each one.
 * Unlike the grid, this component doesn't need an `onAppClick` because the list item handles its own logic.
 */
export const AppList: React.FC<AppListProps> = ({ apps }) => {
    return (
        <div className="space-y-4">
            {apps.map(app => (
                <AppListItem key={app.id} app={app} />
            ))}
        </div>
    );
};
