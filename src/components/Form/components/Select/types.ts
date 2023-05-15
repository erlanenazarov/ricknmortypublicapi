import { SelectProps } from 'antd/lib/select';

import { TFormValue } from 'store/forms/types';

export enum ESelectType {
  VALUE_SET = 'valueSet',
  RAW = 'raw',
}

export interface ISelectProps {
  value: TFormValue[];
  onChange: (selected: TFormValue[]) => void;
  rawOptions?: SelectProps['options'];
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
  selectType?: ESelectType;
  placeholder?: string;
}
