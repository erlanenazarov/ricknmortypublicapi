import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from 'antd/lib/typography';
import Statistic from 'antd/lib/statistic';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import UserOutlined from '@ant-design/icons/UserOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import backgroundTheme from 'assets/img/rnm.png';

import { listCharactersRequest } from 'store/characters/actions';
import {
  makeSelectCharactersCount,
  makeSelectCharactersLoading,
} from 'store/characters/selectors';
import { listEpisodesRequest } from 'store/episodes/actions';
import {
  makeSelectListEpisodesCount,
  makeSelectListEpisodesLoading,
} from 'store/episodes/selectors';
import { listLocationsRequest } from 'store/locations/actions';
import {
  makeSelectLocationsListCount,
  makeSelectLocationListLoading,
} from 'store/locations/selectors';

import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

export const HomeContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const charactersCount = useSelector(makeSelectCharactersCount);
  const charactersLoading = useSelector(makeSelectCharactersLoading);

  const locationsCount = useSelector(makeSelectLocationsListCount);
  const locationsLoading = useSelector(makeSelectLocationListLoading);

  const episodesCount = useSelector(makeSelectListEpisodesCount);
  const episodesLoading = useSelector(makeSelectListEpisodesLoading);

  useEffect(
    () => {
      if (!charactersCount) {
        dispatch(listCharactersRequest({ page: 1 }));
      }

      if (!locationsCount) {
        dispatch(listLocationsRequest({ page: 1 }));
      }

      if (!episodesCount) {
        dispatch(listEpisodesRequest({ page: 1 }));
      }
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  return (
    <div className={styles.root}>
      <div className={styles.imageWr}>
        <img src={backgroundTheme} alt="Rick & Morty" />
      </div>

      <Title level={3} className={styles.textCenter}>
        Welcome to the Rick & Morty universe reviewer
      </Title>

      <Paragraph className={styles.textCenter}>
        Click on the navigation buttons in the site's header and review
        information about the Rick & Morty universe.
      </Paragraph>

      <Space align="center" size="large" className={styles.counters}>
        <Card bordered={false}>
          <Statistic
            title="Characters"
            value={charactersCount}
            loading={charactersLoading}
            prefix={<UserOutlined />}
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Locations"
            value={locationsCount}
            loading={locationsLoading}
            prefix={<RocketOutlined />}
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Episodes"
            value={episodesCount}
            loading={episodesLoading}
            prefix={<OrderedListOutlined />}
          />
        </Card>
      </Space>
    </div>
  );
};
