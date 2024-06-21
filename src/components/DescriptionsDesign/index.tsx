import { DescriptionsDesignProps } from '@/components/DescriptionsDesign/typings';
import { ProDescriptions } from '@ant-design/pro-components';
import classNames from 'classnames';
import { FC, Fragment } from 'react';
import style from './index.less';

// eslint-disable-next-line @typescript-eslint/no-redeclare
const DescriptionsDesign: FC<DescriptionsDesignProps> = ({
  request,
  columns,
  actionRef,
  loading,
  onLoadingChange,
  tooltip,
  formProps,
  editable,
  dataSource,
  onDataSourceChange,
  children,
  title,
  extra,
  className,
  ...props
}) => {
  return (
    <Fragment>
      <ProDescriptions
        className={classNames(style.descriptions, className)}
        title={title}
        tooltip={tooltip}
        dataSource={dataSource}
        formProps={formProps}
        onLoadingChange={onLoadingChange}
        onDataSourceChange={onDataSourceChange}
        editable={editable}
        actionRef={actionRef}
        columns={columns}
        request={request}
        extra={extra}
        loading={loading}
        {...props}
      >
        {children}
      </ProDescriptions>
    </Fragment>
  );
};

export default DescriptionsDesign;
