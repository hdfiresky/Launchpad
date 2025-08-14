import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// The type for the context value. `setTheme` should correctly reflect the type from `useState`.
type ThemeContextType = {
  theme: Theme;
  setTheme: (value: React.SetStateAction<Theme>, event?: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'; // Guard for SSR
  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme as Theme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, internalSetTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
    
    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }
  }, [theme]);

  const setTheme = (value: React.SetStateAction<Theme>, event?: React.MouseEvent) => {
    const newTheme = value instanceof Function ? value(theme) : value;

    // @ts-ignore: `startViewTransition` is not in all browser types yet.
    if (!document.startViewTransition || !event) {
      internalSetTheme(newTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      internalSetTheme(newTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          // Always apply the animation to the new content
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  const contextValue = { theme, setTheme };

  return React.createElement(ThemeContext.Provider, { value: contextValue }, children);
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
