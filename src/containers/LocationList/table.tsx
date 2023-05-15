import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

import { LOCATIONS_PAGE_URL } from 'configuration/routes';

import { ILocation } from 'store/locations/types';

export const columns: ColumnsType<ILocation> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, { id }): ReactNode => (
      <Link to={`${LOCATIONS_PAGE_URL}/${id}`} key={id}>
        {name}
      </Link>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Dimension',
    dataIndex: 'dimension',
    key: 'dimension',
  },
];
