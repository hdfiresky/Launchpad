
import React, { useState, useEffect } from 'react';
import type { AppDefinition } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface DescriptionModalProps {
    /** Controls whether the modal is visible. */
    isOpen: boolean;
    /** Function to call when the modal should be closed (e.g., clicking the overlay or Cancel button). */
    onClose: () => void;
    /** The application data to display in the modal. */
    app: AppDefinition;
    /** Function to call when the user clicks the "Proceed" button. It passes the app and the "Don't show again" choice. */
    onProceed: (app: AppDefinition, dontShowAgain: boolean) => void;
}

/**
 * A modal dialog that gracefully animates into view to display detailed information about an application before navigation.
 * It provides the user with an option to proceed to the app or to bypass this modal in the future.
 * The component is designed to be accessible, closing on overlay clicks.
 */
export const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, app, onProceed }) => {
    // State to track the "Don't show this again" checkbox.
    const [dontShowAgain, setDontShowAgain] = useState(false);
    // State to manage the animation, allowing for a smooth entrance.
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        // When the modal is set to open, we delay setting `isShowing` to true.
        // This allows React to render the component with its initial (hidden) styles first,
        // and then apply the 'showing' styles, triggering the CSS transition.
        if (isOpen) {
            const timer = setTimeout(() => setIsShowing(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsShowing(false);
        }
    }, [isOpen]);

    // If the modal isn't open, render nothing.
    if (!isOpen) return null;

    /**
     * A wrapper for the onProceed callback that passes the current state of the checkbox.
     */
    const handleProceedClick = () => {
        onProceed(app, dontShowAgain);
    };

    // Note: A more robust implementation would handle the 'Escape' key to close the modal and implement a full focus trap.
    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-out ${isShowing ? 'bg-black bg-opacity-60' : 'bg-opacity-0'}`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className={`bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 ease-out ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                // Prevents closing the modal when clicking inside the content area.
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="h-14 w-14 flex-shrink-0 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                            <img src={app.iconUrl} alt={`${app.title} icon`} className="h-9 w-9 object-contain" />
                        </div>
                        <div>
                            <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">{app.title}</h2>
                            <p className="text-slate-500 dark:text-slate-400">{app.description}</p>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        {app.longDescription}
                    </p>

                    <div className="mb-6">
                        {/* Checkbox for the "Don't show again" preference */}
                        <label className="flex items-center space-x-2 cursor-pointer text-slate-600 dark:text-slate-300">
                            <input
                                type="checkbox"
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                                className="h-4 w-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700"
                            />
                            <span>Don't show this again for this app</span>
                        </label>
                    </div>

                    <div className="flex flex-col sm:flex-row-reverse gap-3">
                        <button
                            onClick={handleProceedClick}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
                        >
                            Proceed to App
                            <ExternalLinkIcon className="ml-2 -mr-1 h-5 w-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto inline-flex justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};