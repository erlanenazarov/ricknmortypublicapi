import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import Tooltip from 'antd/lib/tooltip';
import Typography from 'antd/lib/typography';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import FloatButton from 'antd/lib/float-button';
import Badge from 'antd/lib/badge';
import FilterOutlined from '@ant-design/icons/FilterOutlined';

import { Form } from 'components/Form';
import { getSingleValue } from 'components/Form/utils';
import { TFormValues } from 'components/Form/types';

import { makeSelectFormValues } from 'store/forms/selectors';
import { initForm, removeForm, changeFormField } from 'store/forms/actions';

import { safeGet } from 'utils/safeGet';

import { FORM_NAME_POSTFIX } from './constants';
import { IFiltersProps, IFilterConfigContext } from './types';
import styles from './Filters.module.css';

const { Search } = Input;
const { Title } = Typography;

export const Filters = (props: IFiltersProps): JSX.Element => {
  const { name, config, className, onSubmit, initialValues, searchField } =
    props;
  const formName = `${name}${FORM_NAME_POSTFIX}`;

  const dispatch = useDispatch();

  const [fixed, setFixed] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const filterValues = useSelector(makeSelectFormValues(formName));
  const searchInputValue = getSingleValue(
    safeGet(filterValues, searchField || 'name', []),
  );

  const activeFilterCount = Object.values(filterValues).filter(
    value => value.length && value[0],
  ).length;

  const handleSubmit = (values: TFormValues): void => {
    if (!onSubmit) return;
    onSubmit(values);
    setIsPopoverOpen(false);
  };

  const handleSearch = (value: string): void => {
    if (!searchField) return;
    dispatch(
      changeFormField({
        name: formName,
        field: searchField,
        value: value ? [value] : [],
      }),
    );
    handleSubmit({
      ...filterValues,
      [searchField]: [value].filter(Boolean),
    });
  };

  useEffect(
    () => {
      const listener = () => {
        const targetNode = buttonWrapperRef.current;
        if (!targetNode) return;

        const { top, height } = targetNode.getBoundingClientRect();

        if (top < -height && !fixed) {
          setFixed(true);
        }

        if (top > height && fixed) {
          setFixed(false);
        }
      };

      window.addEventListener('scroll', listener);
      return () => {
        window.removeEventListener('scroll', listener);
      };
    },
    // Need to call this effect only when `fixed` is changed
    // eslint-disable-next-line
    [fixed],
  );

  useEffect(
    () => {
      dispatch(initForm({ name: formName, config, initialValues }));

      return () => {
        dispatch(removeForm({ name: formName }));
      };
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={cn(styles.root, className)} ref={buttonWrapperRef}>
      {searchField && (
        <Search
          key={searchInputValue}
          defaultValue={searchInputValue}
          placeholder={`Search by ${searchField}`}
          onSearch={handleSearch}
          allowClear
        />
      )}
      <Tooltip title="Filters">
        <Popover
          content={
            <div>
              <Title level={4} className={styles.filterTitle}>
                Filters
              </Title>
              <Form<IFilterConfigContext>
                name={formName}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 18 }}
                initialValues={initialValues}
                configContext={{ isFixed: fixed }}
                config={config}
                onSubmit={handleSubmit}
                submitButtonText="Apply filters"
                includeSubmitButton
              />
            </div>
          }
          trigger="click"
          placement="bottomRight"
          style={{ minWidth: '100%' }}
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
        >
          {fixed ? (
            <FloatButton
              badge={{
                count: activeFilterCount,
              }}
              icon={<FilterOutlined size={32} />}
              type="primary"
            />
          ) : (
            <Badge color="red" count={activeFilterCount}>
              <Button
                size="middle"
                type="primary"
                shape="circle"
                icon={<FilterOutlined />}
              />
            </Badge>
          )}
        </Popover>
      </Tooltip>
    </div>
  );
};
