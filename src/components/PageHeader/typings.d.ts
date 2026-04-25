import { ComponentType } from 'react';
import { InputAttributes } from 'react-number-format';

export type PageHeaderProps = {
  title: any;
  className?: string | any;
  showBack?: boolean;
  onBack?: () => void;
  [key: string]: any;
};
