import AntSelect from 'antd/lib/select';

import { ISelectProps } from './types';

export const Select = (props: ISelectProps): JSX.Element => {
  const {
    value,
    onChange,
    rawOptions,
    className,
    multiple,
    disabled,
    placeholder,
  } = props;

  return (
    <AntSelect
      value={value}
      onChange={onChange}
      options={rawOptions}
      className={className}
      mode={multiple ? 'multiple' : undefined}
      disabled={disabled}
      placeholder={placeholder}
      allowClear
    />
  );
};
