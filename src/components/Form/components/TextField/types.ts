import { TFormValue } from 'store/forms/types';

export interface ITextFieldProps {
  value?: TFormValue;
  onChange?: (text: TFormValue) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
}
