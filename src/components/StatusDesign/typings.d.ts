export type StatusDesignProps = {
  text?: string;
  status?: 'default' | 'success' | 'processing' | 'error' | 'warning';
  className?: string;
  badge?: boolean;
  [key: string]: any;
};
