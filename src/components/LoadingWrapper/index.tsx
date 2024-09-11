import { Spin } from 'antd';
import React from 'react';
import { LoadingWrapperProps } from './typing';
import { LoadingOutlined } from '@ant-design/icons';
import styleLess from './index.less';

const LoadingWrapper = ({ loading, children }: LoadingWrapperProps) => {
  return (
    <Spin
      className={styleLess.loading}
      spinning={loading}
      indicator={<LoadingOutlined className={styleLess.loading__icon} />}
    >
      {children}
    </Spin>
  );
};

export default LoadingWrapper;
