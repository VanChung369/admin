import {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProListMetas,
  RequestData,
} from '@ant-design/pro-components';
import { RecordCreatorProps } from '@ant-design/pro-table/es/components/EditableTable';
import { ButtonProps, TablePaginationConfig } from 'antd';
import { PaginationConfig } from 'antd/es/pagination';
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TableCurrentDataSource,
  TableRowSelection,
} from 'antd/es/table/interface';
import { GetComponentProps, GetRowKey } from 'rc-table/es/interface';
import { ReactNode, Ref } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TableDesignProps<T, D> = {
  className?: string;
  totalPagination?: number;
  columns?: ProColumns<any, any>[];
  pageSizePagination?: number;
  currentPagination?: number;
  loading?: boolean;
  onChangePagination?: (page: number, pageSize: number) => void;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>,
  ) => void;
  rowSelection?: false | TableRowSelection<any>;
  rowKey?: string | GetRowKey<any>;
  dataSource?: readonly T[] & T[];
  customComponent?: any;
  typeTable?: string;
  children?: ReactNode;
  emptyText?: string;
  onChangeEditTable?: (value: readonly T[]) => void;
  value?: readonly T[];
  scroll?: any;
  recordCreatorProps?:
    | (RecordCreatorProps<any> &
        ButtonProps & {
          creatorButtonText?: ReactNode;
        })
    | false;
  editableFormRef?: Ref<EditableFormInstance>;
  maxLength?: number;
  actionRef?: Ref<ActionType>;
  controlled?: boolean;
  headerTitle?: string | ReactNode;
  request?: (
    params: D & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>,
  ) => Promise<Partial<RequestData<T>>>;
  pagination?:
    | false
    | (false & PaginationConfig)
    | (TablePaginationConfig & false)
    | (TablePaginationConfig & PaginationConfig);
  dragSortKey?: string;
  metas?: ProListMetas<T>;
  dragSortHandlerRender?: (rowData: T, idx: number) => ReactNode;
  onDragSortEnd?: (newDataSource: T[]) => void | Promise<void>;
  onRow?: GetComponentProps<T>;
  toolBarRender?:
    | false
    | ((
        action: ActionType | undefined,
        rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: T[] | undefined },
      ) => ReactNode[]);

  [key: string]: any;
};
