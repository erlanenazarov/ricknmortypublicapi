import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from 'antd/lib/layout';
import Menu, { MenuProps } from 'antd/lib/menu';

import { navbarItems } from 'configuration/routes/routes';

import styles from './App.module.css';

const { Header, Content } = Layout;

export const App = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChangePage: MenuProps['onClick'] = e => {
    navigate(e.key, { replace: true });
  };

  const indicateSelected = (): string[] => {
    const withoutFirstSlash = pathname.replace(/^\//, '');
    const [first] = withoutFirstSlash.split('/');
    return [`/${first}`];
  };

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <Menu
          selectedKeys={indicateSelected()}
          onClick={handleChangePage}
          items={navbarItems}
          mode="horizontal"
        />
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
