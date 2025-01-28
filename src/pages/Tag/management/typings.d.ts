export interface SaleOrderaramsTypes {
  keyword: string;
  status: string | number | null;
  page: number;
  limit: number;
}

export type ListTableProps = {
  total: number;
  data: Array<any>;
  loading: boolean;
  onSetParams: (values: any) => void;
  params: NFTParamsTypes;
  emtpyText?: string;
};

export type SearchProps = {
  onSubmit: (values: any) => void;
  params: SaleOrderaramsTypes;
};
