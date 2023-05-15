import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Result from 'antd/lib/result';
import Typography from 'antd/lib/typography';
import Button from 'antd/lib/button';
import { ResultStatusType } from 'antd/es/result';

import { HOME_PAGE_URL } from 'configuration/routes';

import { IDefaultRouterError } from './types';

const { Paragraph } = Typography;

export const ErrorContainer = (): JSX.Element => {
  const routerError: IDefaultRouterError =
    useRouteError() as IDefaultRouterError;

  return (
    <Result
      status={`${routerError.status}` as ResultStatusType}
      title={routerError.statusText}
      subTitle={
        <div>
          {routerError.message ? (
            <Paragraph>{routerError.message}</Paragraph>
          ) : (
            <Paragraph>Sorry. 😣</Paragraph>
          )}
        </div>
      }
      extra={
        <Link to={HOME_PAGE_URL}>
          <Button type="primary">Go to home</Button>
        </Link>
      }
    />
  );
};

export default ErrorContainer;
