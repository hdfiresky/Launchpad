
import React from 'react';

/**
 * Renders the footer for the application.
 * Displays the copyright information with the current year.
 */
export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Problembuddy. All rights reserved.</p>
            </div>
        </footer>
    );
};
