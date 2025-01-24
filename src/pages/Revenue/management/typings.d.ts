export type ListTableProps = {
  total: number;
  data: Array<any>;
  loading: boolean;
  onSetParams: (values: any) => void;
  params: NFTParamsTypes;
  emtpyText?: string;
  listColumn?: Array<any>;
};

export type SearchProps = {
  onSubmit: (values: any) => void;
  params: NFTParamsTypes;
};

type SaleProps = {
  saleItem: Array<any>;
};

type SaleItemType = {
  label: string;
  value: any;
  toolTip?: string;
  appIcon?: string;
  usd?: number | string;
  currency?: string;
};

type ExportModalProps = {
  visible: boolean;
  onClose: () => void;
};
