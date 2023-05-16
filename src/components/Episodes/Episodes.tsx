import { ReactNode } from 'react';
import Tag from 'antd/lib/tag';
import List from 'antd/lib/list';
import Typography from 'antd/lib/typography';
import Skeleton from 'antd/lib/skeleton';

import { IEpisode } from 'store/episodes/types';

import { IEpisodesProps } from './types';
import styles from './Episodes.module.css';

const { Item: ListItem } = List;
const { Text } = Typography;
const { Meta } = ListItem;
const { Input } = Skeleton;

export const Episodes = (props: IEpisodesProps): JSX.Element => {
  const {
    data,
    isLoading,
    itemsCountOnLoading = 6,
    className,
    onClick,
  } = props;

  const handleClick = (id: string) => (): void => {
    if (!onClick) return;
    onClick(id);
  };

  if (isLoading) {
    return (
      <>
        {new Array(itemsCountOnLoading)
          .fill(styles.skeleton)
          .map((className, idx) => (
            <div data-testid="skeleton" key={idx}>
              <Input block active size="large" rootClassName={className} />
            </div>
          ))}
      </>
    );
  }
  return (
    <List
      className={className}
      bordered
      dataSource={data}
      renderItem={(item: IEpisode): ReactNode => (
        <ListItem
          className={styles.episodeItem}
          onClick={handleClick(item.id)}
          data-testid="episode-item"
        >
          <Meta
            title={`[#${item.id}] ${item.name}`}
            description={<Text>Code: {item.episode}</Text>}
            className={styles.episodeMeta}
          />
          <Tag color="blue">Air date: {item.air_date}</Tag>
        </ListItem>
      )}
    />
  );
};
