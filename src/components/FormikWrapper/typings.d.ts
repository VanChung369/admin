import { MouseEventHandler, ReactNode } from 'react';

export type FormikWrapperProps = {
  initialValues: object | any;
  validationSchema?: object | any;
  onSubmit?: MouseEventHandler<HTMLElement> | any;
  children: ReactNode | any;
  innerRef?: any;
  [key: string]: any;
};
