import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Table from 'antd/lib/table';

import { HOME_PAGE_URL } from 'configuration/routes';
import { DEFAULT_PAGE_SIZE } from 'configuration/pagination';

import { Filters } from 'components/Filters';
import { TFormValues } from 'components/Form/types';

import { submit } from 'containers/CharacterList/submit';
import { normalize } from 'containers/CharacterList/normalize';

import {
  listLocationsRequest,
  clearListLocations,
} from 'store/locations/actions';
import {
  makeSelectLocationListLoading,
  makeSelectLocationsListCount,
  makeSelectLocationsListData,
} from 'store/locations/selectors';

import { FORM_NAME, config } from './filters';
import { columns } from './table';
import styles from './LocationList.module.css';

const { Title } = Typography;

export const LocationListContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const locationsLoading = useSelector(makeSelectLocationListLoading);
  const locationsData = useSelector(makeSelectLocationsListData);
  const locationsCount = useSelector(makeSelectLocationsListCount);

  const requestLocations = (page: number, filters?: TFormValues): void => {
    const submitValues = submit(filters || normalize(searchParams));

    dispatch(listLocationsRequest({ page, filters: submitValues }));
  };

  const getPage = (): number => {
    const page = searchParams.get('page');
    if (page === null) return 1;
    return Number(page);
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams(prevParams => {
      prevParams.set('page', `${newPage}`);
      return prevParams;
    });
    requestLocations(newPage);

    const rootElement = document.getElementById('root');
    if (!rootElement) return;
    rootElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFilterSubmit = (values: TFormValues): void => {
    setSearchParams(submit(values));
    requestLocations(1, values);
  };

  useEffect(
    () => {
      requestLocations(getPage());

      return () => {
        dispatch(clearListLocations());
      };
    },
    // Need to call this effect only once at mount
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={styles.root}>
      <Breadcrumb
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: 'Locations' },
        ]}
      />

      <div className="filters-title">
        <Title level={3}>Browse locations</Title>
        <Filters
          name={FORM_NAME}
          config={config}
          searchField="name"
          initialValues={normalize(searchParams)}
          onSubmit={handleFilterSubmit}
        />
      </div>

      <Table
        loading={locationsLoading}
        dataSource={locationsData}
        pagination={{
          position: ['bottomCenter'],
          current: getPage(),
          pageSize: DEFAULT_PAGE_SIZE,
          total: locationsCount,
          showSizeChanger: false,
          disabled: locationsLoading,
          onChange: handlePageChange,
        }}
        columns={columns}
      />
    </div>
  );
};
