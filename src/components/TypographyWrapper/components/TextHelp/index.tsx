import React from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styleLess from './index.less';

export type TextHelplProps = {
  label?: any;
  children?: any;
  className?: string;
  helpText?: string;
  contentClass?: string;
  labelClassName?: string;
  iconClassName?: string;
};

const TextHelp = ({
  label,
  children,
  className,
  helpText,
  contentClass,
  labelClassName,
  iconClassName,
}: TextHelplProps) => {
  return (
    <div className={classNames(styleLess.text, className)}>
      {label && (
        <span className={classNames(styleLess.text__lable, labelClassName)}>
          {label}
          {helpText && (
            <Tooltip title={helpText} overlayClassName="tooltip-detail">
              <QuestionCircleOutlined />
            </Tooltip>
          )}
        </span>
      )}
      <div className={classNames(styleLess.text__content, contentClass)}>{children}</div>
    </div>
  );
};

export default TextHelp;
