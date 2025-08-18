import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { BRAND_ICON_URL } from '../config';

/**
 * Renders the sticky header for the application.
 * It contains the site logo and title.
 * The backdrop-blur effect provides a modern, semi-transparent look.
 */
export const Header: React.FC = () => {
    return (
        <header className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-lg sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        {/* The application logo. The path is configured in `config.ts`. */}
                        <img src={BRAND_ICON_URL} alt="Problembuddy logo" className="h-7 w-7" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">Problembuddy</span>
                    </div>
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};