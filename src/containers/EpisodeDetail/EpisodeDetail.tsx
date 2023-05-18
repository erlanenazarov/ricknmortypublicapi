import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Skeleton from 'antd/lib/skeleton';

import { HOME_PAGE_URL, EPISODES_PAGE_URL } from 'configuration/routes';

import { InfoText } from 'components/InfoText';
import { Residents } from 'components/Residents';

import {
  episodeDetailRequest,
  clearEpisodeDetail,
} from 'store/episodes/actions';
import {
  makeSelectEpisodeDetailLoading,
  makeSelectEpisodeDetailData,
} from 'store/episodes/selectors';
import { ICharacter } from 'store/characters/types';

import { safeGet } from 'utils/safeGet';

import styles from './EpisodeDetail.module.css';

const { Title } = Typography;
const { Input } = Skeleton;

export const EpisodeDetailContainer = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const isLoading = useSelector(makeSelectEpisodeDetailLoading);
  const episode = useSelector(makeSelectEpisodeDetailData);
  const residents: ICharacter[] = safeGet(episode, 'characters', []);

  useEffect(() => {
    if (!id) return;

    dispatch(episodeDetailRequest({ id }));

    return () => {
      dispatch(clearEpisodeDetail());
    };
  }, [id, dispatch]);

  return (
    <div className={styles.root}>
      <Breadcrumbs
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: <Link to={EPISODES_PAGE_URL}>Episodes</Link> },
          { title: isLoading ? 'Loading...' : safeGet(episode, 'name') },
        ]}
      />

      {isLoading ? (
        <Input block active className={styles.titleSkeleton} />
      ) : (
        <Title level={2}>{safeGet(episode, 'name', '-')}</Title>
      )}

      <InfoText
        isLoading={isLoading}
        items={[
          { label: 'Code', value: safeGet(episode, 'episode', '') },
          { label: 'Air date', value: safeGet(episode, 'air_date', '-') },
        ]}
      />

      <Residents
        residents={residents}
        isLoading={isLoading}
        title="Characters"
      />
    </div>
  );
};
