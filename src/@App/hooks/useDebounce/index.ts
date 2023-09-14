import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: string, timeout: number): string => {
   const [debounceValue, setDebounceValue] = useState<string>('');
   const timer = useRef<number | null>(null);

   useEffect(() => {
      if (timer.current !== null) {
         clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
         setDebounceValue(value);
      }, timeout);

      return () => {
         if (timer.current !== null) {
            clearTimeout(timer.current);
         }
      };
   }, [value, timeout]);

   return debounceValue;
};

export default useDebounce;
