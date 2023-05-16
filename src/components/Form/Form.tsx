import { Fragment, ReactNode, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntForm from 'antd/lib/form';
import Button from 'antd/lib/button';
import Skeleton from 'antd/lib/skeleton';
import cn from 'classnames';

import { changeFormField, setFormTouched } from 'store/forms/actions';
import {
  makeSelectFormValues,
  makeSelectFormLoading,
  makeSelectFormTouched,
} from 'store/forms/selectors';
import { TFormValue } from 'store/forms/types';

import { safeGet } from 'utils/safeGet';

import { TextField } from './components/TextField';
import { Select } from './components/Select';
import { getSingleValue } from './utils';
import { EFieldType, IFormConfig, IFormProps } from './types';
import styles from './Form.module.css';

const { Item } = AntForm;
const { Input: InputSkeleton } = Skeleton;

export const Form = <Context,>(props: IFormProps<Context>): JSX.Element => {
  const {
    name: formName,
    config,
    className,
    onSubmit,
    labelCol,
    wrapperCol,
    includeSubmitButton,
    submitButtonText = 'Submit',
    configContext,
    initialValues,
  } = props;

  const dispatch = useDispatch();
  const isLoading = useSelector(makeSelectFormLoading(formName));
  const isTouched = useSelector(makeSelectFormTouched(formName));
  const formValues = useSelector(makeSelectFormValues(formName));

  const visibleFields = useMemo(
    () =>
      config.filter(({ showIf }) => {
        if (!showIf) return true;
        return showIf(formValues, configContext);
      }),
    [config, formValues, configContext],
  );

  const handleChangeFormField = useCallback(
    (field: string) =>
      (value: TFormValue | TFormValue[]): void => {
        dispatch(changeFormField({ name: formName, field, value }));
      },
    [dispatch, formName],
  );

  const handleSubmit = (): void => {
    if (!onSubmit) return;
    onSubmit(formValues);
  };

  const handleFormClick = () => {
    if (isTouched) return;
    dispatch(setFormTouched({ name: formName, touched: true }));
  };

  const mapConfig = useCallback(
    (item: IFormConfig<Context>): ReactNode => {
      if (isLoading) {
        return <InputSkeleton />;
      }

      const {
        key,
        name,
        type,
        placeholder,
        label,
        rows,
        selectType,
        multiple,
        rawOptions,
        disabledIf,
      } = item;

      const disabled = disabledIf
        ? disabledIf(formValues, configContext)
        : false;

      switch (type) {
        case EFieldType.TEXT: {
          return (
            <Item
              key={key}
              label={label}
              name={name}
              className={styles.formItem}
            >
              <TextField
                value={getSingleValue(formValues[name])}
                onChange={handleChangeFormField(name)}
                multiline={multiple}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
              />
            </Item>
          );
        }
        case EFieldType.SELECT: {
          return (
            <Item key={key} label={label} className={styles.formItem}>
              <Select
                value={safeGet(formValues, name, [])}
                onChange={handleChangeFormField(name)}
                multiple={multiple}
                selectType={selectType}
                rawOptions={rawOptions}
                disabled={disabled}
                placeholder={placeholder}
              />
            </Item>
          );
        }
        default:
        case EFieldType.HIDDEN:
          return <Fragment key={key} />;
      }
    },
    [formValues, configContext, handleChangeFormField, isLoading],
  );

  return (
    <AntForm
      className={cn(styles.root, className)}
      name={formName}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={handleSubmit}
      onClick={handleFormClick}
      autoComplete="off"
      initialValues={initialValues}
    >
      {visibleFields.map(mapConfig)}

      {includeSubmitButton && (
        <Item
          className={styles.formItem}
          wrapperCol={{
            offset: labelCol?.span,
            span: wrapperCol?.span,
          }}
        >
          <Button type="primary" htmlType="submit">
            {submitButtonText}
          </Button>
        </Item>
      )}
    </AntForm>
  );
};
