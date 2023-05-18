import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';

import { HOME_PAGE_URL, LOCATIONS_PAGE_URL } from 'configuration/routes';

import { InfoText } from 'components/InfoText';
import { Residents } from 'components/Residents';

import {
  locationDetailRequest,
  clearLocationDetail,
} from 'store/locations/actions';
import {
  makeSelectLocationDetailLoading,
  makeSelectLocationDetailData,
} from 'store/locations/selectors';
import { ICharacter } from 'store/characters/types';

import { safeGet } from 'utils/safeGet';

import styles from './LocationDetail.module.css';

const { Title } = Typography;

export const LocationDetailContainer = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const isLoading = useSelector(makeSelectLocationDetailLoading);
  const locationData = useSelector(makeSelectLocationDetailData);

  const residents: ICharacter[] = safeGet(locationData, 'residents', []);

  useEffect(() => {
    if (!id) return;

    dispatch(locationDetailRequest({ id }));

    return () => {
      dispatch(clearLocationDetail());
    };
  }, [id, dispatch]);

  return (
    <div className={styles.root}>
      <Breadcrumbs
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: <Link to={LOCATIONS_PAGE_URL}>Locations</Link> },
          { title: isLoading ? 'Loading...' : safeGet(locationData, 'name') },
        ]}
      />

      <Title level={2}>{safeGet(locationData, 'name')}</Title>

      <InfoText
        isLoading={isLoading}
        items={[
          { label: 'type', value: safeGet(locationData, 'type') },
          {
            label: 'dimension',
            value: safeGet(locationData, 'dimension', '-'),
          },
        ]}
      />

      <Residents residents={residents} isLoading={isLoading} />
    </div>
  );
};
