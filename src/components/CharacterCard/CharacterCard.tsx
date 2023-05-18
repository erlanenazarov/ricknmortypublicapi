import { memo, ReactNode, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import Tag from 'antd/lib/tag';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import Button from 'antd/lib/button';
import ExclamationOutlined from '@ant-design/icons/ExclamationOutlined';
import ManOutlined from '@ant-design/icons/ManOutlined';
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import WomanOutlined from '@ant-design/icons/WomanOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';

import { EGender } from 'store/characters/types';
import { addFavorite, removeFromFavorite } from 'store/favorites/actions';
import { makeSelectIsCachedItem } from 'store/favorites/selectors';

import { safeGet } from 'utils/safeGet';

import { ICharacterCardProps } from './types';
import { getStatusColor } from './utils';
import styles from './CharacterCard.module.css';

const { Meta } = Card;
const { Image } = Skeleton;

export const CharacterCard = memo((props: ICharacterCardProps): JSX.Element => {
  const {
    id,
    name,
    image,
    gender,
    species,
    type,
    status,
    loading,
    className,
    onClick,
    testId,
  } = props;

  const dispatch = useDispatch();
  const isFavorite = useSelector(makeSelectIsCachedItem(id));

  const getGenderIcon = (): ReactNode => {
    const testId = 'gender-icon';
    const mapper = {
      [EGender.FEMALE]: <WomanOutlined data-testid={testId} />,
      [EGender.MALE]: <ManOutlined data-testid={testId} />,
      [EGender.GENDERLESS]: <ExclamationOutlined data-testid={testId} />,
      [EGender.UNKNOWN]: <QuestionOutlined data-testid={testId} />,
    };
    return safeGet(mapper, gender, EGender.UNKNOWN);
  };

  const getCoverImage = (): ReactNode => {
    if (loading) {
      return (
        <div data-testid="loading-indicator">
          <Image
            active
            rootClassName={styles.previewLoadingWrapper}
            style={{ height: 300 }}
          />
        </div>
      );
    }
    return <img loading="lazy" src={image} alt={name} />;
  };

  const handleAddToFavorite = (e: SyntheticEvent): void => {
    e.stopPropagation();

    dispatch(isFavorite ? removeFromFavorite(id) : addFavorite(id));
  };

  return (
    <Card
      data-testid={testId}
      className={cn(styles.root, className)}
      hoverable
      loading={loading}
      cover={getCoverImage()}
      onClick={onClick}
    >
      <Button
        type="primary"
        shape="circle"
        icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
        onClick={handleAddToFavorite}
        className={styles.favoriteButton}
      />
      <Meta
        title={name}
        description={
          <div className={styles.tags}>
            <Tag icon={getGenderIcon()} color="blue">
              {gender}
            </Tag>
            <Tag color="blue">Species: {species}</Tag>
            {type && <Tag color="blue">Type: {type}</Tag>}
            <Tag color={getStatusColor(status)}>{status}</Tag>
          </div>
        }
      />
    </Card>
  );
});
