import { DividerDesignProps } from '@/components/DividerDesign/typings';
import { Divider } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import styleLess from './index.less';

const DividerDesign: FC<DividerDesignProps> = ({
  dashed,
  orientation,
  orientationMargin,
  plain,
  style,
  type,
  className,
  children,
  ...props
}) => {
  return (
    <Divider
      dashed={dashed}
      orientation={orientation}
      orientationMargin={orientationMargin}
      plain={plain}
      style={style}
      type={type}
      className={classNames(styleLess.divider, className)}
      {...props}
    >
      {children}
    </Divider>
  );
};

export default DividerDesign;
