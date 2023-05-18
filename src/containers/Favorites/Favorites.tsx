import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'antd/lib/breadcrumb';
import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';

import { CHARACTERS_PAGE_URL, HOME_PAGE_URL } from 'configuration/routes';

import { CharactersGrid } from 'components/CharactersGrid';

import {
  fetchFavoritesRequest,
  clearFetchedFavorites,
} from 'store/favorites/actions';
import {
  makeSelectFetchedFavoritesData,
  makeSelectFetchedFavoritesLoading,
} from 'store/favorites/selectors';

import { useChunkView } from 'hooks/useChunkView';

import styles from './Favorites.module.css';

const { Title } = Typography;

export const FavoritesContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(makeSelectFetchedFavoritesLoading);
  const favorites = useSelector(makeSelectFetchedFavoritesData);

  const [chunkedFavorites, isButtonVisible, offset, addOffset] =
    useChunkView(favorites);

  const handleNavigateToCharactersCard = (id: string) => {
    navigate(`${CHARACTERS_PAGE_URL}/${id}`);
  };

  useEffect(() => {
    dispatch(fetchFavoritesRequest());

    return () => {
      dispatch(clearFetchedFavorites());
    };
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <Breadcrumb
        items={[
          { title: <Link to={HOME_PAGE_URL}>Home</Link> },
          { title: 'Favorites' },
        ]}
      />

      <Title level={2}>Favorites</Title>
      <CharactersGrid
        characters={chunkedFavorites}
        loading={isLoading}
        onClick={handleNavigateToCharactersCard}
      />
      {isButtonVisible && (
        <div className={styles.showMoreWr}>
          <Button type="primary" onClick={addOffset}>
            {offset >= favorites.length ? 'Hide' : 'Show more'}
          </Button>
        </div>
      )}
    </div>
  );
};
