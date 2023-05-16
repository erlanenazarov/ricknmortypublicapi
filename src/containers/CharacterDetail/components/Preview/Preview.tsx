import Image from 'antd/lib/image';
import Skeleton from 'antd/lib/skeleton';

import { IPreviewProps } from './types';
import styles from './Preview.module.css';

const { Image: SkeletonImage } = Skeleton;

export const Preview = (props: IPreviewProps): JSX.Element => {
  const { isLoading, image } = props;

  return (
    <div className={styles.root}>
      {!isLoading ? (
        image && <Image src={image} />
      ) : (
        <SkeletonImage active className={styles.skeleton} />
      )}
    </div>
  );
};
