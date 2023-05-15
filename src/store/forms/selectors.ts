import { List } from 'immutable';
import { createSelector } from 'reselect';

import { TFormValues } from 'components/Form/types';

import { IAppState } from 'store/types';

import { extractValueFromState } from 'utils/extractValueFromState';

import { TFormStateSelectorReturnType, TFormState, TFormValue } from './types';

const selectState = (state: IAppState): TFormState => state.forms;

export const makeSelectFormValues = (
  name: string,
): TFormStateSelectorReturnType<TFormValues> =>
  createSelector(selectState, (state: TFormState): TFormValues => {
    const form = state.get(name);
    if (!form) return {};
    const values = form.get('values');
    return values.toJS() as TFormValues;
  });

export const makeSelectFormLoading = (
  name: string,
): TFormStateSelectorReturnType<boolean> =>
  createSelector(
    selectState,
    extractValueFromState([name, '_META', 'isLoading'], false),
  );

export const makeSelectFormTouched = (
  name: string,
): TFormStateSelectorReturnType<boolean> =>
  createSelector(
    selectState,
    extractValueFromState([name, '_META', 'isTouched'], false),
  );

export const makeSelectFormFieldValue = (
  name: string,
  field = '-',
): TFormStateSelectorReturnType<TFormValue[]> =>
  createSelector(selectState, (state: TFormState): TFormValue[] => {
    const rawValue = state.getIn([name, 'values', field]);
    if (!rawValue) return [];
    const value = rawValue as List<TFormValue>;
    return value.toJS() as TFormValue[];
  });
