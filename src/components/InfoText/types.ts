import { ReactNode } from 'react';

export interface IInfoTextItem {
  label: string;
  value: ReactNode | string;
}

export interface IInfoTextProps {
  title?: string;
  isLoading?: boolean;
  items: IInfoTextItem[];
}
