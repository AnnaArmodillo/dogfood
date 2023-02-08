import { useEffect, useState } from 'react';

export function useDebounce(value, ms = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);
    return () => {
      clearTimeout(timeOutID);
    };
  }, [ms, value]);
  return debouncedValue;
}
