import { createAction } from 'utils/createAction';

import {
  IInitFormPayload,
  IChangeFormFieldPayload,
  IFormNamePayload,
  ISetFormInitialsPayload,
  ISetFormTouchedPayload,
} from './types';

const STATE_KEY = '@forms';

export const INIT_FORM = `${STATE_KEY}/INIT_FORM`;
export const SET_FORM_INITIALS = `${STATE_KEY}/SET_FORM_INITIALS`;
export const SET_FORM_TOUCHED = `${STATE_KEY}/SET_FORM_TOUCHED`;
export const REMOVE_FORM = `${STATE_KEY}/REMOVE_FORM`;
export const CHANGE_FORM_FIELD = `${STATE_KEY}/CHANGE_FORM_FIELD`;

export const initForm = createAction<IInitFormPayload>(INIT_FORM);
export const setFormInitials =
  createAction<ISetFormInitialsPayload>(SET_FORM_INITIALS);
export const setFormTouched =
  createAction<ISetFormTouchedPayload>(SET_FORM_TOUCHED);
export const removeForm = createAction<IFormNamePayload>(REMOVE_FORM);
export const changeFormField =
  createAction<IChangeFormFieldPayload>(CHANGE_FORM_FIELD);
