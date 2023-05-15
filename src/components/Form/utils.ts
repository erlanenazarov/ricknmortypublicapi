import { TFormValue } from 'store/forms/types';

export const getSingleValue = (
  value?: TFormValue[],
): TFormValue | undefined => {
  if (!value || !value.length) return;
  return value[0] as TFormValue;
};
