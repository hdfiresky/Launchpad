
import React, { useState, useEffect, useRef } from 'react';
import type { AppDefinition } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface DescriptionModalProps {
    /** Controls whether the modal is visible. */
    isOpen: boolean;
    /** Function to call when the modal should be closed (e.g., clicking the overlay or Cancel button). */
    onClose: () => void;
    /** The application data to display in the modal. */
    app: AppDefinition;
}

/**
 * A modal dialog that gracefully animates into view to display detailed information about an application.
 * It provides the user with an option to proceed to the app or to close the modal.
 * The component is designed to be accessible, closing on overlay clicks, Escape key, and trapping focus.
 */
export const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, app }) => {
    // State to manage the animation, allowing for a smooth entrance.
    const [isShowing, setIsShowing] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

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

    // Handle focus trap and Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }

            if (event.key === 'Tab') {
                if (!modalRef.current) return;

                const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea, input, select'
                );
                
                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Set initial focus on the close button when the modal appears
    useEffect(() => {
        if (isShowing && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isShowing]);

    // If the modal isn't open, render nothing.
    if (!isOpen) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-out ${isShowing ? 'bg-black bg-opacity-60' : 'bg-opacity-0'}`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                ref={modalRef}
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

                    <div className="flex flex-col sm:flex-row-reverse gap-3">
                        <a
                            href={app.href}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors no-underline"
                        >
                            Go to App
                            <ExternalLinkIcon className="ml-2 -mr-1 h-5 w-5" />
                        </a>
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="w-full sm:w-auto inline-flex justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};