import { TFormValues } from 'components/Form/types';
import { getSingleValue } from 'components/Form/utils';

export const submit = (formValues: TFormValues): Record<string, string> =>
  Object.entries(formValues).reduce((memo, [key, values]) => {
    const value = getSingleValue(values);
    if (!value) return memo;
    return {
      ...memo,
      [key]: `${value}`,
    };
  }, {} as Record<string, string>);

export const submitToQuery = (formValues: TFormValues): URLSearchParams => {
  const result = new URLSearchParams();

  for (const [key, value] of Object.entries(submit(formValues))) {
    result.append(key, value);
  }

  return result;
};
