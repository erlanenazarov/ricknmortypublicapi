import { TFormValues } from 'components/Form/types';

const targetFields: string[] = ['name', 'status', 'species', 'type', 'gender'];

export const normalize = (searchParams: URLSearchParams): TFormValues => {
  const result: TFormValues = {};

  for (const [key, value] of searchParams.entries()) {
    if (!targetFields.includes(key)) continue;
    result[key] = [value];
  }

  return result;
};
