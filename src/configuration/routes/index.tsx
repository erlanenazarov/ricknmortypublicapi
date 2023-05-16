import { createHashRouter as createRouter } from 'react-router-dom';
import { App } from 'App';

import { ErrorContainer } from 'containers/Error';

import { routes } from './routes';

export const router = createRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorContainer />,
    children: routes,
  },
]);

export * from './constants';
