import {
  ProDescriptionsItemProps,
  RequestData,
  RowEditableConfig,
} from '@ant-design/pro-components';
import { ProCoreActionType } from '@ant-design/pro-utils';
import { ValueType } from '@rc-component/mini-decimal';
import { RecordType } from '@umijs/utils/compiled/zod';
import { FormProps } from 'antd';
import { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { MutableRefObject, ReactNode } from 'react';

export type DescriptionsProps = {
  params?: Record<string, any>;
  className?: string | any;
  title?: ReactNode;
  extra?: ReactNode;
  onRequestError?: (e: Error) => void;
  request?: (params: Record<string, any>) => Promise<RequestData>;
  columns?: ProDescriptionsItemProps<RecordType, ValueType>[];
  actionRef?: MutableRefObject<ProCoreActionType<any> | undefined>;
  loading?: boolean;
  onLoadingChange?: (loading?: boolean) => void;
  tooltip?: LabelTooltipType | string;
  tip?: string;
  formProps?: FormProps;
  editable?: RowEditableConfig<RecordType>;
  dataSource?: RecordType;
  onDataSourceChange?: (value: RecordType) => void;
  children?: ReactNode;

  [key: string]: any;
};
