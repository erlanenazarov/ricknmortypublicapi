import { Typography } from 'antd';
import backgroundTheme from 'assets/img/rnm.png';

import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

export const HomeContainer = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Title level={3}>Welcome to the Rick & Morty universe reviewer</Title>

      <div className={styles.imageWr}>
        <img src={backgroundTheme} alt="Rick & Morty" />
      </div>

      <Paragraph>
        Click on the navigation buttons in the site's header and review
        information about the Rick & Morty universe.
      </Paragraph>
    </div>
  );
};
