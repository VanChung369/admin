import { CSSProperties, ReactNode } from 'react';

export type DividerDesignProps = {
  dashed?: boolean;
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: number | string;
  titleTooltip?: string;
  plain?: boolean;
  className?: string | undefined;
  style?: CSSProperties;
  text?: ReactNode;
  type?: 'horizontal' | 'vertical';
  htmlType?: string | any;
  children?: ReactNode;

  [key: string]: any;
};
