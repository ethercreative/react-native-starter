import * as React from 'react';
import { sleep } from '../helpers';
import { useBoolean } from './';

export const useMounted = (delay: number): boolean => {
  const [mounted, setMounted] = useBoolean();

  React.useEffect(() => {
    (async () => {
      await sleep(delay);
      setMounted(true);
    })();
  }, []);

  return mounted;
};
