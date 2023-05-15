import { createHashRouter as createRouter } from 'react-router-dom';
import { AppContainer } from 'App';

import { ErrorContainer } from 'containers/Error';

import { routes } from './routes';

export const router = createRouter([
  {
    path: '/',
    element: <AppContainer />,
    errorElement: <ErrorContainer />,
    children: routes,
  },
]);

export * from './constants';
