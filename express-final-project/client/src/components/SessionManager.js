import { useState } from 'react';

function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  const clearStorage = () => {
    window.sessionStorage.removeItem(key);
  };

  return [storedValue, setValue, clearStorage];
}

export default useSessionStorage;
