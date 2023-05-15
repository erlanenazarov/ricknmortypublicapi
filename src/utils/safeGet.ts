import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';

export const safeGet = <V, D = undefined>(
  instance: V,
  path: string,
  defaultValue?: D,
): D => {
  const result: D = get(instance, path, defaultValue);

  if (isBoolean(result) || result === 0) {
    return result;
  }
  return result || (defaultValue as D);
};
