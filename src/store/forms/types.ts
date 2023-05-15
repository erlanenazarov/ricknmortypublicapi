import { List, Map, RecordOf } from 'immutable';

import {
  IFormConfig,
  TFormValues as TJSFormValues,
} from 'components/Form/types';

import { THandler, TSelectorReturnType } from 'store/types';

export type TFormValue = string | number;
export type TFormValues = Map<string, List<TFormValue>>;

export interface IFormMeta {
  config: List<IFormConfig>;
  isLoading?: boolean;
  isTouched?: boolean;
}

export interface IFormStatePiece {
  _META: IFormMeta;
  values: TFormValues;
}

export type TFormState = Map<string, RecordOf<IFormStatePiece>>;
export type TFormStateHandler<T = void> = THandler<TFormState, T>;
export type TFormStateSelectorReturnType<T> = TSelectorReturnType<
  T,
  TFormState
>;

export interface IFormNamePayload {
  name: string;
}

export interface IInitFormPayload extends IFormNamePayload {
  config: IFormConfig[];
  initialValues?: TJSFormValues;
}

export interface ISetFormInitialsPayload extends IFormNamePayload {
  values: TJSFormValues;
}

export interface IChangeFormFieldPayload extends IFormNamePayload {
  field: string;
  value: TFormValue | TFormValue[];
}

export interface ISetFormTouchedPayload extends IFormNamePayload {
  touched: boolean;
}
