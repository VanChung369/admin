import { MenuProps } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';

export type ButtonDesignProps = {
  type?: 'default' | 'primary' | 'link' | 'text' | 'ghost' | 'dashed';
  shape?: 'default' | 'circle' | 'round';
  icon?: ReactNode;
  size?: 'small' | 'middle' | 'large';
  titleTooltip?: string;
  triggerTooltip?: 'contextMenu' | 'click' | 'focus' | 'hover';
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  text: ReactNode;
  menu?: MenuProps;
  disabled?: boolean;
  danger?: boolean;
  dropdown?: boolean;
  block?: boolean;
  htmlType?: string | any;
  loading?: boolean;
  href?: string;
  children?: ReactNode;
  [key: string]: any;
};
