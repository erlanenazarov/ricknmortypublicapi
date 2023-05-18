import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from 'antd/lib/typography';
import Statistic from 'antd/lib/statistic';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import UserOutlined from '@ant-design/icons/UserOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';

import {
  CHARACTERS_PAGE_URL,
  LOCATIONS_PAGE_URL,
  EPISODES_PAGE_URL,
} from 'configuration/routes';

import { charactersTotalCountRequest } from 'store/characters/actions';
import {
  makeSelectCharactersTotalCountLoading,
  makeSelectCharactersTotalCountData,
} from 'store/characters/selectors';
import { episodesTotalCountRequest } from 'store/episodes/actions';
import {
  makeSelectEpisodesTotalCountLoading,
  makeSelectEpisodesTotalCountData,
} from 'store/episodes/selectors';
import { locationsTotalCountRequest } from 'store/locations/actions';
import {
  makeSelectLocationsTotalCountData,
  makeSelectLocationsTotalCountLoading,
} from 'store/locations/selectors';

import backgroundTheme from 'assets/img/rnm.png';

import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

export const HomeContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const charactersCount = useSelector(makeSelectCharactersTotalCountData);
  const charactersLoading = useSelector(makeSelectCharactersTotalCountLoading);

  const locationsCount = useSelector(makeSelectLocationsTotalCountData);
  const locationsLoading = useSelector(makeSelectLocationsTotalCountLoading);

  const episodesCount = useSelector(makeSelectEpisodesTotalCountData);
  const episodesLoading = useSelector(makeSelectEpisodesTotalCountLoading);

  const handleNavigate = (path: string) => () => {
    navigate(path, { replace: true });
  };

  useEffect(
    () => {
      if (!charactersCount) {
        dispatch(charactersTotalCountRequest());
      }
      if (!locationsCount) {
        dispatch(locationsTotalCountRequest());
      }
      if (!episodesCount) {
        dispatch(episodesTotalCountRequest());
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
        <Card
          bordered={false}
          hoverable
          onClick={handleNavigate(CHARACTERS_PAGE_URL)}
        >
          <Statistic
            title="Characters"
            value={charactersCount}
            loading={charactersLoading}
            prefix={<UserOutlined />}
          />
        </Card>
        <Card
          bordered={false}
          hoverable
          onClick={handleNavigate(LOCATIONS_PAGE_URL)}
        >
          <Statistic
            title="Locations"
            value={locationsCount}
            loading={locationsLoading}
            prefix={<RocketOutlined />}
          />
        </Card>
        <Card
          bordered={false}
          hoverable
          onClick={handleNavigate(EPISODES_PAGE_URL)}
        >
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
