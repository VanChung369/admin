import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  RequestData,
} from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';
import { SpinProps, TablePaginationConfig } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import { SortOrder } from 'antd/es/table/interface';
import classNames from 'classnames';
import { GetRowKey } from 'rc-table/es/interface';
import { Fragment, ReactNode, Ref } from 'react';

type DragSortTableProps<T, D> = {
  headerTitle?: string | ReactNode;
  editableFormRef?: Ref<EditableFormInstance>;
  rowKey?: string | GetRowKey<any>;
  dragSortKey?: string;
  pagination?:
    | false
    | (false & PaginationConfig)
    | (TablePaginationConfig & false)
    | (TablePaginationConfig & PaginationConfig);
  request?: (
    params: D & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<Partial<RequestData<T>>>;

  toolBarRender?:
    | false
    | ((
        action: ActionType | undefined,
        rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: T[] | undefined },
      ) => ReactNode[]);
  columns?: ProColumns<any, any>[];
  className?: string;
  scroll?: any;
  loading?: boolean | SpinProps;
  dataSource?: readonly T[] & T[];
  onDragSortEnd?: (newDataSource: T[]) => void | Promise<void>;
  search?: false | SearchConfig;
  dragSortHandlerRender?: (rowData: T, idx: number) => ReactNode;
  actionRef?: Ref<ActionType>;

  [key: string]: any;
};

const SortTable = <T extends Record<string, any>, D extends Record<string, any>>({
  headerTitle,
  rowKey,
  dataSource,
  scroll,
  loading,
  dragSortKey,
  columns,
  request,
  onDragSortEnd,
  className,
  pagination = false,
  search = false,
  dragSortHandlerRender,
  actionRef,
  toolBarRender = false,
  ...props
}: DragSortTableProps<T, D>) => {
  return (
    <Fragment>
      <DragSortTable<T, D>
        className={classNames(className)}
        headerTitle={headerTitle}
        toolBarRender={toolBarRender}
        dataSource={dataSource}
        columns={columns}
        request={request}
        actionRef={actionRef}
        pagination={pagination}
        scroll={scroll || { x: 960 }}
        search={search}
        rowKey={rowKey}
        loading={loading}
        dragSortHandlerRender={dragSortHandlerRender}
        dragSortKey={dragSortKey}
        onDragSortEnd={onDragSortEnd}
        {...props}
      />
    </Fragment>
  );
};

export default SortTable;
