import cn from 'classnames';
import Spin from 'antd/lib/spin';
import RocketOutlined from '@ant-design/icons/RocketOutlined';

import { CharacterCard } from 'components/CharacterCard';

import { ICharactersGridProps } from './types';
import styles from './CharactersGrid.module.css';

export const CharactersGrid = (props: ICharactersGridProps): JSX.Element => {
  const { characters, loading, className, cardClassName, onClick } = props;

  const handleClick = (id: string) => (): void => {
    if (!onClick) return;
    onClick(id);
  };

  if (!characters.length && loading) {
    return (
      <div className={styles.emptyLoading} data-testid="loading-indicator">
        <Spin
          indicator={<RocketOutlined style={{ fontSize: 56 }} spin />}
          spinning
        />
      </div>
    );
  }
  return (
    <div className={cn(styles.gridRoot, className)}>
      {characters.map(({ id, name, image, status, type, gender, species }) => (
        <div className={styles.gridItem} key={id}>
          <CharacterCard
            id={id}
            image={image}
            name={name}
            status={status}
            type={type}
            gender={gender}
            species={species}
            loading={loading}
            className={cn(styles.card, cardClassName)}
            onClick={handleClick(id)}
            testId="character-card"
          />
        </div>
      ))}
    </div>
  );
};
