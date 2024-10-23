import TableWrapper from '@/components/TableWrapper';
import { useIntl } from '@umijs/max';
import React from 'react';
import { columns } from './columns';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { setOrderSorter } from '@/utils/sort';
import { SORT_TABLE } from 'types';
import { LENGTH_CONSTANTS } from '@/constants';
import { NFT_SALE_HISTORY_FIELD } from '@/pages/nft/constants';

type TableHistoryProps = {
  total: number;
  listHistory: Array<any> | undefined;
  limit: number;
  page: number;
  loading: boolean;
  params: any;
  onSetParams: (values: any) => void;
  handleChangePaging: (page: number, limit: number) => void;
};

const { ORDER, PAGE } = NFT_SALE_HISTORY_FIELD;

const { DEFAULT_PAGE } = LENGTH_CONSTANTS;

const TableHistory = ({
  total,
  listHistory,
  limit,
  page,
  loading,
  params,
  onSetParams,
  handleChangePaging,
}: TableHistoryProps) => {
  const intl = useIntl();

  const handleChangeTable = (
    _pagination: TablePaginationConfig,
    _filter: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    _extra: TableCurrentDataSource<any>,
  ) => {
    const { order, field } = sorter as SORT_TABLE;
    const newOrder = setOrderSorter(order);

    onSetParams({
      ...params,
      field,
      [ORDER]: newOrder,
      [PAGE]: DEFAULT_PAGE,
    });
  };

  return (
    <TableWrapper
      total={total}
      columns={columns(intl, page, limit)}
      loading={loading}
      dataSource={listHistory}
      pageSize={limit}
      current={page}
      onChangePagination={handleChangePaging}
      onChange={handleChangeTable}
      rowKey={(row: any) => row?._id}
    />
  );
};

export default TableHistory;
