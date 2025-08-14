
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppGrid } from './components/AppGrid';
import { AppList } from './components/AppList';
import { DescriptionModal } from './components/DescriptionModal';
import { APPS } from './constants';
import type { AppDefinition, ViewMode } from './types';
import { GridIcon } from './components/icons/GridIcon';
import { ListIcon } from './components/icons/ListIcon';
import { useLocalStorage } from './hooks/useLocalStorage';

/**
 * The main application component.
 * It orchestrates the entire UI, including the header, footer,
 * main content area with app listings, and the view mode controls.
 * It also manages the state for the app display and the description modal.
 */
const App: React.FC = () => {
  // State to manage the current view mode ('grid' or 'list').
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  // State to hold the currently selected app, used to show the description modal.
  const [selectedApp, setSelectedApp] = useState<AppDefinition | null>(null);
  // State to control the visibility of the description modal.
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Custom hook to manage user's "Don't show again" preferences in localStorage.
  // This persists the user's choice across sessions.
  // The key 'problembuddy-dont-show-again' is used to store the data.
  const [dontShowAgainRegistry, setDontShowAgainRegistry] = useLocalStorage<Record<string, boolean>>('problembuddy-dont-show-again', {});
  
  /**
   * Handles clicking on an app.
   * If the user has previously checked "Don't show again" for this app,
   * it opens the app's link directly. Otherwise, it opens the description modal.
   * useCallback is used for performance optimization, preventing re-creation on re-renders.
   */
  const handleAppClick = useCallback((app: AppDefinition) => {
    if (dontShowAgainRegistry[app.id]) {
        window.open(app.href, '_blank', 'noopener,noreferrer');
    } else {
        setSelectedApp(app);
        setIsModalOpen(true);
    }
  }, [dontShowAgainRegistry]);

  /**
   * Closes the description modal and resets the selected app state.
   * useCallback ensures the function reference is stable.
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedApp(null);
  }, []);

  /**
   * Handles the "Proceed" action from the description modal.
   * It updates the "Don't show again" registry if the checkbox was ticked,
   * opens the app's link in a new tab, and closes the modal.
   */
  const handleProceed = useCallback((app: AppDefinition, dontShowAgain: boolean) => {
    if (dontShowAgain) {
        // Updates the localStorage-backed state.
        setDontShowAgainRegistry(prev => ({ ...prev, [app.id]: true }));
    }
    window.open(app.href, '_blank', 'noopener,noreferrer');
    handleCloseModal();
  }, [handleCloseModal, setDontShowAgainRegistry]);


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
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Applications</h2>
                 {/* View mode toggle buttons (Grid/List) */}
                <div className="flex items-center space-x-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-brand-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                        aria-label="Grid View"
                        aria-pressed={viewMode === 'grid'}
                    >
                        <GridIcon />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-brand-primary' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                        aria-label="List View"
                        aria-pressed={viewMode === 'list'}
                    >
                       <ListIcon />
                    </button>
                </div>
            </div>
        </div>

        {/* Conditionally render AppGrid or AppList based on the current viewMode state */}
        {viewMode === 'grid' ? (
            <AppGrid apps={APPS} onAppClick={handleAppClick} />
        ) : (
            <AppList apps={APPS} />
        )}

      </main>
      <Footer />
      {/* The DescriptionModal is rendered only when an app is selected, improving performance. */}
      {selectedApp && (
        <DescriptionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            app={selectedApp}
            onProceed={handleProceed}
        />
      )}
    </div>
  );
};

export default App;
