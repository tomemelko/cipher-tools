import { useState, useEffect } from 'react';

export type Dimensions = {
  height: number;
  width: number;
}

function useSizeAwareness(): Dimensions {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return dimensions;
}

// eslint-disable-next-line import/prefer-default-export -- I plan on adding more than one hook
export { useSizeAwareness };
