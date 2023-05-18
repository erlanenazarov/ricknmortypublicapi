import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'antd/lib/layout';
import Menu, { MenuProps } from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import Badge from 'antd/lib/badge';
import HeartTwoTone from '@ant-design/icons/HeartTwoTone';

import { navbarItems } from 'configuration/routes/routes';
import { FAVORITES_PAGE_URL } from 'configuration/routes';

import { makeSelectCachedFavorites } from 'store/favorites/selectors';

import styles from './App.module.css';

const { Header, Content } = Layout;

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cachedFavorites = useSelector(makeSelectCachedFavorites);

  const handleChangePage: MenuProps['onClick'] = e => {
    navigate(e.key, { replace: true });
  };

  const indicateSelected = (): string[] => {
    const withoutFirstSlash = pathname.replace(/^\//, '');
    const [first] = withoutFirstSlash.split('/');
    return [`/${first}`];
  };

  const handleNavigateToFavorites = (): void => {
    navigate(FAVORITES_PAGE_URL);
  };

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <Menu
          selectedKeys={indicateSelected()}
          onClick={handleChangePage}
          items={navbarItems}
          mode="horizontal"
          rootClassName={styles.menu}
        />
        <Tooltip title="Favorites" placement="bottom">
          <Badge count={cachedFavorites?.length}>
            <Button
              shape="circle"
              icon={<HeartTwoTone />}
              type="link"
              onClick={handleNavigateToFavorites}
            />
          </Badge>
        </Tooltip>
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
