import { RouteObject } from 'react-router-dom';
import { ReactNode } from 'react';

export interface IRoute extends RouteObject {
  icon: ReactNode;
  label: string;
  hiddenInNavbar?: boolean;
}
