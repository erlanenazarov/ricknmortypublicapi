import { useEffect, useState } from 'react';
import Input, { InputRef } from 'antd/lib/input';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import { ITextFieldProps } from './types';

const { TextArea } = Input;

export const TextField = (props: ITextFieldProps): JSX.Element => {
  const {
    value,
    onChange,
    placeholder,
    multiline = false,
    rows = 5,
    disabled,
  } = props;
  const [ref, _setRef] = useState<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  const setTextAreaRef = (node: TextAreaRef | null): void => {
    if (
      !node ||
      !node.resizableTextArea ||
      !node.resizableTextArea.textArea ||
      isEqual(node.resizableTextArea.textArea, ref)
    ) {
      return;
    }

    _setRef(node.resizableTextArea.textArea);
  };

  const setInputRef = (node: InputRef | null): void => {
    if (!node || !node.input || isEqual(ref, node.input)) return;
    _setRef(node.input);
  };

  useEffect(() => {
    const handler = debounce(
      (value: string): void => {
        if (!onChange) return;
        onChange(value);
      },
      300,
      { leading: false, trailing: true },
    );

    const listener = (e: Event): void => {
      if (!e.target) return;
      const input = e.target as HTMLInputElement;
      if (input.value === value) return;
      handler(input.value);
    };

    if (ref) {
      ref.addEventListener('input', listener);
      ref.addEventListener('change', listener);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('input', listener);
        ref.removeEventListener('change', listener);
      }
    };
  }, [onChange, value, ref]);

  return !multiline ? (
    <Input
      placeholder={placeholder}
      defaultValue={value}
      ref={setInputRef}
      disabled={disabled}
    />
  ) : (
    <TextArea
      placeholder={placeholder}
      defaultValue={value}
      ref={setTextAreaRef}
      rows={rows}
      disabled={disabled}
    />
  );
};
