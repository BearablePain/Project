import { useEffect } from 'react';

export const useMount = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback();
    }
    // eslint-disable-next-line
  }, []);
};
