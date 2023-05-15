import { Map, List } from 'immutable';

import { createReducer } from 'utils/createReducer';
import { createImmutableRecord } from 'utils/createImmutableRecord';
import { populateFormValues } from 'utils/populateFormValues';

import {
  IFormStatePiece,
  IFormMeta,
  TFormState,
  TFormStateHandler,
  IInitFormPayload,
  IChangeFormFieldPayload,
  IFormNamePayload,
  ISetFormInitialsPayload,
  TFormValue,
  ISetFormTouchedPayload,
} from './types';
import {
  INIT_FORM,
  SET_FORM_INITIALS,
  REMOVE_FORM,
  CHANGE_FORM_FIELD,
  SET_FORM_TOUCHED,
} from './actions';

const initialState: TFormState = Map({});

const initForm: TFormStateHandler<IInitFormPayload> = (state, action) => {
  const { name, config, initialValues } = action.payload;

  if (state.has(name)) return state;
  return state.set(
    name,
    createImmutableRecord<IFormStatePiece>({
      _META: createImmutableRecord<IFormMeta>({
        config: List(config),
        isLoading: false,
        isTouched: false,
      }),
      values: populateFormValues(config, initialValues),
    }),
  );
};

const setInitials: TFormStateHandler<ISetFormInitialsPayload> = (
  state,
  action,
) => {
  const { name, values } = action.payload;

  if (!state.has(name)) return state;
  return state
    .setIn([name, '_META', 'loading'], false)
    .updateIn(
      [name, 'values'],
      (prev: unknown): Map<string, List<TFormValue>> => {
        let prevValues = prev as Map<string, List<TFormValue>>;

        for (const [key, value] of Object.entries(values)) {
          prevValues = prevValues.set(key, List([`${value}`]));
        }

        return prevValues;
      },
    );
};

const removeForm: TFormStateHandler<IFormNamePayload> = (state, action) => {
  const { name } = action.payload;

  if (!state.has(name)) return state;
  return state.remove(name);
};

const changeFormField: TFormStateHandler<IChangeFormFieldPayload> = (
  state,
  action,
) => {
  const { name, field, value } = action.payload;

  if (!state.has(name)) return state;
  return state.setIn(
    [name, 'values', field],
    List(Array.isArray(value) ? value : [value]),
  );
};

const setFormTouched: TFormStateHandler<ISetFormTouchedPayload> = (
  state,
  action,
) => {
  const { name, touched } = action.payload;

  if (!state.has(name)) return state;
  return state.setIn([name, '_META', 'isTouched'], touched);
};

export default createReducer<TFormState>(initialState, {
  [INIT_FORM]: initForm,
  [REMOVE_FORM]: removeForm,
  [CHANGE_FORM_FIELD]: changeFormField,
  [SET_FORM_INITIALS]: setInitials,
  [SET_FORM_TOUCHED]: setFormTouched,
});
