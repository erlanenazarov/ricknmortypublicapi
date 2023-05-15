import { FormProps } from 'antd/lib/form';

import { TFormValue } from 'store/forms/types';

import { ITextFieldProps } from './components/TextField/types';
import { ISelectProps } from './components/Select/types';

export type TFormValues = Record<string, TFormValue[]>;

export enum EFieldType {
  TEXT = 'text',
  SELECT = 'select',
  DATETIME = 'datetime',
  HIDDEN = 'hidden',
}

export interface IFormConfig<Context = never>
  extends Pick<ITextFieldProps, 'rows' | 'placeholder'>,
    Pick<ISelectProps, 'multiple' | 'rawOptions' | 'selectType'> {
  key: string;
  name: string;
  label: string;
  type: EFieldType;
  showIf?: (formValues: TFormValues, context?: Context) => boolean;
  disabledIf?: (formValues: TFormValues, context?: Context) => boolean;
}

export interface IFormProps<Context = never> {
  name: string;
  config: IFormConfig<Context>[];
  className?: string;
  onSubmit?: (formValues: TFormValues) => void;
  labelCol?: FormProps['labelCol'];
  wrapperCol?: FormProps['wrapperCol'];
  includeSubmitButton?: boolean;
  submitButtonText?: string;
  configContext?: Context;
  initialValues?: TFormValues;
}
