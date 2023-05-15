import { Map, List } from 'immutable';

import { IFormConfig, TFormValues } from 'components/Form/types';

import { TFormValue } from 'store/forms/types';

import { safeGet } from 'utils/safeGet';

export const populateFormValues = (
  config: IFormConfig[],
  initialValues?: TFormValues,
): Map<string, List<TFormValue>> =>
  config.reduce((memo, curr) => {
    const { name } = curr;
    const value = safeGet(initialValues, name, []);
    return memo.set(name, List(value));
  }, Map({}) as Map<string, List<TFormValue>>);
