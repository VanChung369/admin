import type {
  ActionType,
  ProColumns,
  ProListMetas,
  RequestData,
  RowEditableConfig,
} from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { SpinProps, TablePaginationConfig } from 'antd';
import { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { PaginationConfig } from 'antd/es/pagination';
import { ExpandableConfig, SortOrder, TableRowSelection } from 'antd/es/table/interface';
import classNames from 'classnames';
import { GetComponentProps, GetRowKey } from 'rc-table/es/interface';
import { Fragment, ReactNode, Ref } from 'react';
import style from './index.less';

type TableListProps<T, D> = {
  headerTitle?: string | ReactNode;
  rowKey?: string | GetRowKey<any>;
  request?: (
    params: D & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<Partial<RequestData<T>>>;
  onRow?: GetComponentProps<T>;
  toolBarRender?:
    | false
    | ((
        action: ActionType | undefined,
        rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: T[] | undefined },
      ) => ReactNode[]);
  columns?: ProColumns<any, any>[];
  rowSelection?: false | TableRowSelection<any>;
  editable?: RowEditableConfig<T>;
  className?: string;
  scroll?: any;
  tooltip?: LabelTooltipType;
  loading?: boolean | SpinProps;
  actionRef?: Ref<ActionType>;
  dataSource?: readonly T[] & T[];
  showActions?: 'hover' | 'always';
  showExtra?: 'hover' | 'always';
  metas?: ProListMetas<T>;

  itemLayout?: 'horizontal' | 'vertical';
  pagination?:
    | false
    | (false & PaginationConfig)
    | (TablePaginationConfig & false)
    | (TablePaginationConfig & PaginationConfig);
  expandable?: ExpandableConfig<T>;
  [key: string]: any;
};

const TableList = <T extends Record<string, any>, D extends Record<string, any>>({
  headerTitle,
  rowKey,
  scroll,
  loading,
  columns,
  request,
  editable,
  className,
  actionRef,
  tooltip,
  dataSource,
  toolBarRender = false,
  expandable,
  onRow,
  rowSelection = false,
  pagination,
  showActions,
  showExtra,
  itemLayout,
  metas,
  ...props
}: TableListProps<T, D>) => {
  return (
    <Fragment>
      <ProList<T, D>
        className={classNames(style.tableList, className)}
        headerTitle={headerTitle}
        tooltip={tooltip}
        expandable={expandable}
        dataSource={dataSource}
        showActions={showActions}
        showExtra={showExtra}
        pagination={pagination}
        toolBarRender={toolBarRender}
        columns={columns}
        actionRef={actionRef}
        request={request}
        onRow={onRow}
        scroll={scroll || { x: 960 }}
        rowKey={rowKey}
        itemLayout={itemLayout}
        editable={editable}
        metas={metas}
        loading={loading}
        rowSelection={rowSelection}
        {...props}
      />
    </Fragment>
  );
};

export default TableList;
