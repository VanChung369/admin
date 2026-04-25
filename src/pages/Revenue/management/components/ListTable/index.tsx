import React from 'react';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { LENGTH_CONSTANTS, ORDERS } from '@/constants';
import { ListTableProps } from '../../typings';
import { SORT_TABLE } from 'types';
import { setOrderSorter } from '@/utils/sort';
import TableWrapper from '@/components/TableWrapper';
import { useIntl } from '@umijs/max';
import { columns } from './columns';
import { REVENUE_MANAGEMENT_FIELD } from '@/pages/Revenue/constants';

const { PAGE, LIMIT } = REVENUE_MANAGEMENT_FIELD;
const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;
const { ORDER, FIELD } = ORDERS;

const ListTable = ({
  total,
  data,
  loading,
  onSetParams,
  params,
  listColumn,
  emtpyText,
}: ListTableProps) => {
  const intl = useIntl();
  const { limit, page } = params;

  const handleChangePaging = (page: number, limit: number) => {
    onSetParams({
      ...params,
      [PAGE]: limit !== limit ? DEFAULT_PAGE : page,
      [LIMIT]: limit,
    });
  };

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
      [FIELD]: field,
      [ORDER]: newOrder,
      [PAGE]: DEFAULT_PAGE,
    });
  };

  const selectedColumns = columns(intl, page, limit).filter((column) =>
    listColumn?.includes(column.key),
  );

  return (
    <TableWrapper
      total={total}
      columns={selectedColumns}
      loading={loading}
      dataSource={data}
      pageSize={limit}
      current={page}
      isPagination={total > limit || total > DEFAULT_PAGE_SIZE}
      onChangePagination={handleChangePaging}
      onChange={handleChangeTable}
      emptyText={emtpyText}
      rowKey={(row: any) => row?._id}
    />
  );
};

export default ListTable;
