export type StatusWrapperProps = {
  text?: string;
  status?: 'default' | 'success' | 'processing' | 'error' | 'warning' | any;
  className?: string;
  badge?: boolean;
  [key: string]: any;
};
