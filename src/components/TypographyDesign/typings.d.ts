import { ReactNode } from 'react';

export type TypographyDesignProps = {
  isShorten?: boolean;
  copyable?: any;
  rowsNumber?: number;
  icon?: ReactNode;
  typeTypography?: string;
  className?: string;
  text?: string;
  customComponent?: any;
  children?: ReactNode;
  onChange?: (string) => any;
  tooltip?: boolean | ReactNode;
  editing?: boolean;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  editableText?: string;
  onCancel?: function;
  onStart?: function;
  onEnd?: function;
  triggerType?: ('icon' | 'text')[];
  enterIcon?: ReactNode;
  textButton?: string;
  [key: string]: any;
};
