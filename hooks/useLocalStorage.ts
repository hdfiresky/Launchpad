
import { useState, useEffect, useCallback } from 'react';

// Defines the type for the setter function, allowing a value or a function updater.
type SetValue<T> = (value: T | ((val: T) => T)) => void;

/**
 * A custom React hook that syncs a state value with `window.localStorage`.
 * It provides a similar interface to `useState` but persists the value across browser sessions.
 * @param key The key to use in localStorage.
 * @param initialValue The initial value to use if no value is found in localStorage.
 * @returns A tuple containing the stored value and a function to update it, same as useState.
 */
export const useLocalStorage = <T,>(key: string, initialValue: T): [T, SetValue<T>] => {
  /**
   * Reads the value from localStorage.
   * It's wrapped in useCallback to prevent it from being recreated on every render.
   * Gracefully handles cases where `window` is not defined (e.g., server-side rendering).
   */
  const readValue = useCallback((): T => {
    // Prevent build errors during server-side rendering
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none, return initialValue
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value. We pass `readValue` as the initial state function.
  const [storedValue, setStoredValue] = useState<T>(readValue);

  /**
   * The setter function that updates the state and persists it to localStorage.
   * It mimics the behavior of React's state setter, accepting a value or a function.
   */
  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  // This effect ensures that the state is initialized on the client-side,
  // preventing hydration mismatches if the initial render was on the server.
  useEffect(() => {
    setStoredValue(readValue());
    // The eslint-disable is to prevent an infinite loop if `readValue` was not memoized.
    // Since it is wrapped in useCallback, this is safe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storedValue, setValue];
};
