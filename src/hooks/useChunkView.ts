import { useState, useCallback } from 'react';

import { DEFAULT_CHUNK_SIZE } from 'configuration/chunkView';

export const useChunkView = <T>(
  array: T[],
  chunkSize = DEFAULT_CHUNK_SIZE,
): [T[], boolean, number, () => void] => {
  const [offset, setOffset] = useState(chunkSize);

  const addOffset = useCallback(() => {
    setOffset(prevState => {
      if (prevState >= array.length) return chunkSize;
      return prevState + chunkSize;
    });
  }, [chunkSize, array]);

  return [array.slice(0, offset), array.length > chunkSize, offset, addOffset];
};
