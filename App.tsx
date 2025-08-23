

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppGrid } from './components/AppGrid';
import { AppList } from './components/AppList';
import { DescriptionModal } from './components/DescriptionModal';
import { APPS } from './constants';
import type { AppDefinition, ViewMode } from './types';
import { useDebounce } from './hooks/useDebounce';
import { GridIcon } from './components/icons/GridIcon';
import { ListIcon } from './components/icons/ListIcon';
import { SearchIcon } from './components/icons/SearchIcon';

/**
 * The main application component.
 * It orchestrates the entire UI, including the header, footer,
 * main content area with app listings, and the view mode controls.
 * It also manages the state for the description modal.
 */
const App: React.FC = () => {
  // State to manage the current view mode ('grid' or 'list').
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  // State to hold the currently selected app, used to show the description modal.
  const [selectedApp, setSelectedApp] = useState<AppDefinition | null>(null);
  // State to control the visibility of the description modal.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for ARIA live region to announce view changes.
  const [liveRegionMessage, setLiveRegionMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const isFirstRender = useRef(true);
  
  /**
   * Handles clicking on an app's info icon.
   * It opens the description modal to show more details about the app.
   * useCallback is used for performance optimization, preventing re-creation on re-renders.
   */
  const handleInfoClick = useCallback((app: AppDefinition) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  }, []);

  /**
   * Closes the description modal and resets the selected app state.
   * useCallback ensures the function reference is stable.
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedApp(null);
  }, []);

  // Announce view mode changes to screen readers, skipping the initial render.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setLiveRegionMessage(`Switched to ${viewMode} view.`);
    // Clear the message to allow re-announcing if toggled quickly.
    const timer = setTimeout(() => setLiveRegionMessage(''), 1000);
    return () => clearTimeout(timer);
  }, [viewMode]);

  // Memoize the filtered apps list to prevent re-calculation on every render
  const filteredApps = useMemo(() => {
    if (!debouncedSearchQuery) {
        return APPS;
    }
    const lowercasedQuery = debouncedSearchQuery.toLowerCase();
    return APPS.filter(app =>
        app.title.toLowerCase().includes(lowercasedQuery) ||
        app.description.toLowerCase().includes(lowercasedQuery)
    );
  }, [debouncedSearchQuery]);


  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Personal Command Center</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                A curated suite of powerful tools to solve problems, streamline your digital life, and boost productivity.
            </p>
        </div>
        
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex-shrink-0">Applications</h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            aria-label="Search applications"
                        />
                    </div>
                    {/* View mode toggle buttons (Grid/List) */}
                    <div className="flex items-center space-x-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg self-end sm:self-auto flex-shrink-0">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-brand-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-700`}
                            aria-label="Grid View"
                            aria-pressed={viewMode === 'grid'}
                        >
                            <GridIcon />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-brand-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-700`}
                            aria-label="List View"
                            aria-pressed={viewMode === 'list'}
                        >
                        <ListIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* This container animates the view switch. The key forces a re-mount, re-triggering the animation. */}
        <div key={viewMode} className="animate-fade-in-up">
            {filteredApps.length > 0 ? (
                 viewMode === 'grid' ? (
                    <AppGrid apps={filteredApps} onInfoClick={handleInfoClick} />
                ) : (
                    <AppList apps={filteredApps} onInfoClick={handleInfoClick} />
                )
            ) : (
                <div className="text-center py-12 px-4">
                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="mt-2 text-xl font-semibold text-slate-800 dark:text-slate-100">No applications found</h3>
                    <p className="mt-1 text-slate-500 dark:text-slate-400">
                        Your search for "{searchQuery}" did not match any applications.
                    </p>
                </div>
            )}
        </div>
        
        {/* Visually hidden container for screen reader announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
            {liveRegionMessage}
        </div>
      </main>
      <Footer />
      {/* The DescriptionModal is rendered only when an app is selected, improving performance. */}
      {selectedApp && (
        <DescriptionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            app={selectedApp}
        />
      )}
    </div>
  );
};

export default App;