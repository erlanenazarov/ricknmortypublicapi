import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Badge from 'antd/lib/badge';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';

import {
  HOME_PAGE_URL,
  CHARACTERS_PAGE_URL,
  LOCATIONS_PAGE_URL,
  EPISODES_PAGE_URL,
} from 'configuration/routes';

import { Episodes } from 'components/Episodes';
import { getStatusColor } from 'components/CharacterCard/utils';
import { InfoText } from 'components/InfoText';

import {
  characterDetailClear,
  characterDetailRequest,
} from 'store/characters/actions';
import {
  makeSelectCharacterDetailLoading,
  makeSelectCharacterDetailData,
} from 'store/characters/selectors';
import { IEpisode } from 'store/episodes/types';

import { useChunkView } from 'hooks/useChunkView';

import { safeGet } from 'utils/safeGet';

import { Preview } from './components/Preview';
import styles from './CharacterDetail.module.css';

const { Title } = Typography;

export const CharacterDetailContainer = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(makeSelectCharacterDetailLoading);
  const character = useSelector(makeSelectCharacterDetailData);
  const episodes: IEpisode[] = safeGet(character, 'episode', []);
  const originId: string | null = safeGet(character, 'origin.id', null);

  const [chunkedEpisodes, isButtonVisible, offset, addOffset] =
    useChunkView(episodes);

  const infoDataItems = [
    { label: 'Gender', value: safeGet(character, 'gender') },
    { label: 'Type', value: safeGet(character, 'type', '-') },
    { label: 'Species', value: safeGet(character, 'species', '-') },
    {
      label: 'Last known location',
      value: (
        <Link to={`${LOCATIONS_PAGE_URL}/${safeGet(character, 'location.id')}`}>
          {safeGet(character, 'location.name')}
        </Link>
      ),
    },
    {
      label: 'First seen in',
      value: !originId ? (
        safeGet(character, 'origin.name', 'unknown')
      ) : (
        <Link to={`${LOCATIONS_PAGE_URL}/${originId}`}>
          {safeGet(character, 'origin.name')}
        </Link>
      ),
    },
  ];

  const handleNavigateToEpisodePage = (id: string): void => {
    navigate(`${EPISODES_PAGE_URL}/${id}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(characterDetailRequest({ id }));
    }

    return () => {
      dispatch(characterDetailClear());
    };
  }, [id, dispatch]);

  return (
    <div className={styles.root}>
      <Breadcrumb
        className={styles.breadcrumbs}
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: <Link to={CHARACTERS_PAGE_URL}>Characters</Link> },
          { title: isLoading ? 'Loading...' : safeGet(character, 'name') },
        ]}
      />

      {!isLoading && (
        <div className={styles.titleWr}>
          <Title level={2} className={styles.title}>
            {safeGet(character, 'name')}
          </Title>
          <Tag color={getStatusColor(safeGet(character, 'status'))}>
            {safeGet(character, 'status')}
          </Tag>
        </div>
      )}

      <div className={styles.characterRoot}>
        <div className={styles.previewWr}>
          <Preview isLoading={isLoading} image={safeGet(character, 'image')} />

          <InfoText isLoading={isLoading} items={infoDataItems} />
        </div>
        <div className={styles.infoRoot}>
          <Title level={2} className={styles.episodesHead}>
            Episodes
            {episodes.length > 0 && (
              <Badge
                color="blue"
                count={episodes.length}
                rootClassName={styles.episodesCountBadge}
              />
            )}
          </Title>
          <Episodes
            data={chunkedEpisodes}
            isLoading={isLoading}
            onClick={handleNavigateToEpisodePage}
          />
          {isButtonVisible && (
            <div className={styles.showMoreWr}>
              <Button type="primary" onClick={addOffset}>
                {offset >= episodes.length ? 'Hide' : 'Show more'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
