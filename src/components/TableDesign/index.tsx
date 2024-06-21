import SortTable from '@/components/TableDesign/components/DragSortTable';
import EditTable from '@/components/TableDesign/components/EditableTable';
import Table from '@/components/TableDesign/components/Table';
import TableList from '@/components/TableDesign/components/TableList';
import { TableDesignProps } from '@/components/TableDesign/typings';
import { TYPE_TABLE } from '@/constants/type';
import classNames from 'classnames';
import { memo } from 'react';
import style from './index.less';

const TableDesign = <T extends Record<string, any>, D extends Record<string, any>>({
  customComponent,
  totalPagination,
  typeTable,
  columns,
  dataSource,
  pageSizePagination,
  currentPagination,
  loading,
  onChangePagination,
  onChange,
  onChangeEditTable,
  rowSelection,
  rowKey,
  value,
  scroll,
  maxLength,
  recordCreatorProps,
  editableFormRef,
  controlled,
  headerTitle,
  actionRef,
  request,
  pagination,
  dragSortHandlerRender,
  dragSortKey,
  onDragSortEnd,
  metas,
  onRow,
  toolBarRender,
  ...props
}: TableDesignProps<T, D>) => {
  let tableRender = customComponent;

  switch (typeTable) {
    case TYPE_TABLE.TABLE:
      tableRender = (
        <Table<T, D>
          headerTitle={headerTitle}
          totalPagination={totalPagination}
          toolBarRender={toolBarRender}
          columns={columns}
          pagination={pagination}
          request={request}
          actionRef={actionRef}
          dataSource={dataSource}
          pageSizePagination={pageSizePagination}
          currentPagination={currentPagination}
          loading={loading}
          rowSelection={rowSelection}
          onChangePagination={onChangePagination}
          onChange={onChange}
          rowKey={rowKey}
          scroll={scroll}
          {...props}
        />
      );
      break;
    case TYPE_TABLE.EDIT_TABLE:
      tableRender = (
        <EditTable<T, D>
          headerTitle={headerTitle}
          controlled={controlled}
          toolBarRender={toolBarRender}
          columns={columns}
          request={request}
          pagination={pagination}
          actionRef={actionRef}
          dataSource={dataSource}
          loading={loading}
          value={value}
          onChange={onChangeEditTable}
          rowKey={rowKey}
          scroll={scroll}
          maxLength={maxLength}
          recordCreatorProps={recordCreatorProps}
          editableFormRef={editableFormRef}
          {...props}
        />
      );
      break;
    case TYPE_TABLE.SORT_TABLE:
      tableRender = (
        <SortTable<T, D>
          headerTitle={headerTitle}
          columns={columns}
          loading={loading}
          toolBarRender={toolBarRender}
          request={request}
          pagination={pagination}
          actionRef={actionRef}
          value={value}
          dataSource={dataSource}
          onChange={onChangeEditTable}
          rowKey={rowKey}
          scroll={scroll}
          maxLength={maxLength}
          recordCreatorProps={recordCreatorProps}
          editableFormRef={editableFormRef}
          dragSortHandlerRender={dragSortHandlerRender}
          dragSortKey={dragSortKey}
          onDragSortEnd={onDragSortEnd}
          {...props}
        />
      );
      break;
    case TYPE_TABLE.TABLE_LIST:
      tableRender = (
        <TableList<T, D>
          headerTitle={headerTitle}
          columns={columns}
          loading={loading}
          request={request}
          toolBarRender={toolBarRender}
          pagination={pagination}
          actionRef={actionRef}
          value={value}
          dataSource={dataSource}
          metas={metas}
          rowSelection={rowSelection}
          rowKey={rowKey}
          scroll={scroll}
          onRow={onRow}
          {...props}
        />
      );
      break;
    default:
      tableRender = (
        <Table<T, D>
          headerTitle={headerTitle}
          totalPagination={totalPagination}
          columns={columns}
          toolBarRender={toolBarRender}
          pagination={pagination}
          request={request}
          actionRef={actionRef}
          dataSource={dataSource}
          pageSizePagination={pageSizePagination}
          currentPagination={currentPagination}
          loading={loading}
          onChangePagination={onChangePagination}
          rowSelection={rowSelection}
          onChange={onChange}
          rowKey={rowKey}
          scroll={scroll}
          {...props}
        />
      );
      break;
  }

  return <div className={classNames(style.table)}>{tableRender}</div>;
};

export default memo(TableDesign) as typeof TableDesign;
