import Typography from 'antd/lib/typography';
import Skeleton from 'antd/lib/skeleton';

import { IInfoTextProps } from './types';
import styles from './InfoText.module.css';

const { Paragraph } = Typography;
const { Input } = Skeleton;

export const InfoText = (props: IInfoTextProps): JSX.Element => {
  const { isLoading, items = [] } = props;

  return (
    <div className={styles.root}>
      {items.map(({ label, value }) =>
        !isLoading ? (
          <Paragraph key={label}>
            {label}: {value}
          </Paragraph>
        ) : (
          <div key={label} data-testid="info-text-skeleton">
            <Input className={styles.itemSkeleton} block active size="small" />
          </div>
        ),
      )}
    </div>
  );
};
