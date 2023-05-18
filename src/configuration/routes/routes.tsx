import { Outlet } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/UserOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import { HomeContainer } from 'containers/Home';
import { CharacterListContainer } from 'containers/CharacterList';
import { CharacterDetailContainer } from 'containers/CharacterDetail';
import { LocationListContainer } from 'containers/LocationList';
import { LocationDetailContainer } from 'containers/LocationDetail';
import { EpisodeListContainer } from 'containers/EpisodeList';
import { EpisodeDetailContainer } from 'containers/EpisodeDetail';
import { FavoritesContainer } from 'containers/Favorites';

import { IRoute } from './types';
import {
  HOME_PAGE_URL,
  CHARACTERS_PAGE_URL,
  LOCATIONS_PAGE_URL,
  EPISODES_PAGE_URL,
  FAVORITES_PAGE_URL,
} from './constants';

export const routes: IRoute[] = [
  {
    index: true,
    element: <HomeContainer />,
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    path: CHARACTERS_PAGE_URL,
    element: <Outlet />,
    label: 'Characters',
    icon: <UserOutlined />,
    children: [
      {
        index: true,
        element: <CharacterListContainer />,
      },
      {
        path: `${CHARACTERS_PAGE_URL}/:id`,
        element: <CharacterDetailContainer />,
      },
    ],
  },
  {
    path: LOCATIONS_PAGE_URL,
    element: <Outlet />,
    label: 'Locations',
    icon: <RocketOutlined />,
    children: [
      {
        index: true,
        element: <LocationListContainer />,
      },
      {
        path: `${LOCATIONS_PAGE_URL}/:id`,
        element: <LocationDetailContainer />,
      },
    ],
  },
  {
    path: EPISODES_PAGE_URL,
    element: <Outlet />,
    label: 'Episodes',
    icon: <OrderedListOutlined />,
    children: [
      {
        index: true,
        element: <EpisodeListContainer />,
      },
      {
        path: `${EPISODES_PAGE_URL}/:id`,
        element: <EpisodeDetailContainer />,
      },
    ],
  },
  {
    path: FAVORITES_PAGE_URL,
    element: <FavoritesContainer />,
    label: 'Favorites',
    icon: <HeartOutlined />,
    hiddenInNavbar: true,
  },
];

export const navbarItems: ItemType[] = routes
  .filter(({ hiddenInNavbar }) => !hiddenInNavbar)
  .map(({ index, path, label, icon }) => ({
    key: index ? HOME_PAGE_URL : `${path}`,
    label,
    icon,
  }));
