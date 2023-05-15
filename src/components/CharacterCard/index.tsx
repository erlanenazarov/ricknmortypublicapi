import { memo, ReactNode } from 'react';
import cn from 'classnames';
import Tag from 'antd/lib/tag';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import {
  ExclamationOutlined,
  ManOutlined,
  QuestionOutlined,
  WomanOutlined,
} from '@ant-design/icons';

import { EGender } from 'store/characters/types';

import { safeGet } from 'utils/safeGet';

import { ICharacterCardProps } from './types';
import { getStatusColor } from './utils';
import styles from './CharacterCard.module.css';

const { Meta } = Card;
const { Image } = Skeleton;

export const CharacterCard = memo((props: ICharacterCardProps): JSX.Element => {
  const {
    name,
    image,
    gender,
    species,
    type,
    status,
    loading,
    className,
    onClick,
  } = props;

  const getGenderIcon = (): ReactNode => {
    const mapper = {
      [EGender.FEMALE]: <WomanOutlined />,
      [EGender.MALE]: <ManOutlined />,
      [EGender.GENDERLESS]: <ExclamationOutlined />,
      [EGender.UNKNOWN]: <QuestionOutlined />,
    };
    return safeGet(mapper, gender, EGender.UNKNOWN);
  };

  const getCoverImage = (): ReactNode => {
    if (loading) {
      return (
        <Image
          active
          rootClassName={styles.previewLoadingWrapper}
          style={{ height: 300 }}
        />
      );
    }
    return <img loading="lazy" src={image} alt={name} />;
  };

  return (
    <Card
      className={cn(styles.root, className)}
      hoverable
      loading={loading}
      cover={getCoverImage()}
      onClick={onClick}
    >
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
