import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styleLess from './index.less';
import { QuestionCircleOutlined } from '@ant-design/icons';

type ItemWithLabelProps = {
  label?: any;
  children?: any;
  className?: string;
  helpText?: string;
  contentClass?: string;
  labelClassName?: string;
  iconClassName?: string;
};

const ItemWithLabel = ({
  label,
  children,
  className,
  helpText,
  contentClass,
  labelClassName,
  iconClassName,
}: ItemWithLabelProps) => {
  return (
    <div className={classNames(styleLess.item, className)}>
      {label && (
        <span className={classNames(styleLess.item__label, labelClassName)}>
          {label}
          {helpText && (
            <Tooltip title={helpText} overlayClassName="tooltip-detail">
              <QuestionCircleOutlined className={styleLess.item__icon} />
            </Tooltip>
          )}
        </span>
      )}
      <div className={classNames(styleLess.item__content, contentClass)}>{children}</div>
    </div>
  );
};

export default ItemWithLabel;
