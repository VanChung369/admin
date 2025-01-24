export type DetailProps = {
  revenueId: string;
};

type DetailModalProps = {
  visible: boolean;
  onClose?: () => void;
  dataRevenue?: any;
  loading?: boolean;
};

type DetailItemProps = {
  label: string;
  value?: number | string;
  prefixIcon?: string;
  currency?: string;
  usd?: number | string;
  address?: string;
  isAdmin?: boolean;
  noShort?: boolean;
  royalties?: number | string;
  className?: string;
};
