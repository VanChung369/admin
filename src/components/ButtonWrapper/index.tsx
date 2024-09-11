import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import { ButtonWrapperProps } from './typings';
import styleLess from './index.less';

function ButtonWrapper({
  variant = 'default',
  prefixIcon,
  afterIcon,
  text,
  className,
  ...props
}: ButtonWrapperProps) {
  return (
    <Button
      className={classNames(styleLess.button, [styleLess[`button--${variant}`]], {
        [`${className}`]: !!className,
      })}
      {...props}
    >
      {prefixIcon}
      <span>{text}</span>
      {afterIcon}
    </Button>
  );
}

export default ButtonWrapper;
