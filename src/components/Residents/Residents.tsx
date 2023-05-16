import { useNavigate } from 'react-router-dom';
import Typography from 'antd/lib/typography';
import Skeleton from 'antd/lib/skeleton';
import Badge from 'antd/lib/badge';
import Button from 'antd/lib/button';

import { CHARACTERS_PAGE_URL } from 'configuration/routes';
import { DEFAULT_CHUNK_SIZE } from 'configuration/chunkView';

import { CharactersGrid } from 'components/CharactersGrid';

import { useChunkView } from 'hooks/useChunkView';

import { IResidentsProps } from './types';
import styles from './Residents.module.css';

const { Title } = Typography;

export const Residents = (props: IResidentsProps): JSX.Element => {
  const {
    residents = [],
    title = 'Residents',
    isLoading,
    chunkSize = DEFAULT_CHUNK_SIZE,
  } = props;

  const navigate = useNavigate();

  const [chunkedResidents, isActionVisible, offset, addOffset] = useChunkView(
    residents,
    chunkSize,
  );

  const handleNavigateToCharacterPage = (id: string): void => {
    navigate(`${CHARACTERS_PAGE_URL}/${id}`);
  };

  if (!residents.length && !isLoading) {
    return (
      <Title level={5} className={styles.residentsTitle}>
        There is no residents... 😔
      </Title>
    );
  }
  return (
    <>
      {isLoading ? (
        <Skeleton.Input active block />
      ) : (
        <div className={styles.residentsHead}>
          <Title level={4} className={styles.residentsTitle}>
            {title}
          </Title>
          <Badge count={residents.length} />
        </div>
      )}

      <CharactersGrid
        characters={chunkedResidents}
        loading={isLoading}
        onClick={handleNavigateToCharacterPage}
      />
      {isActionVisible && (
        <div className={styles.showMoreWr}>
          <Button type="primary" onClick={addOffset}>
            {offset >= residents.length ? 'Hide' : 'Show more'}
          </Button>
        </div>
      )}
    </>
  );
};
