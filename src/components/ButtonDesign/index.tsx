import { Button, Dropdown, Tooltip } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import style from './index.less';
import { ButtonDesignProps } from './typings';

const ButtonDesign: FC<ButtonDesignProps> = ({
  dropdown = false,
  titleTooltip,
  triggerTooltip,
  text,
  menu,
  className,
  children,
  ...props
}) => {
  return (
    <Tooltip title={titleTooltip} trigger={triggerTooltip}>
      {dropdown ? (
        <Dropdown.Button className={classNames(style.button, className)} menu={menu} {...props}>
          {text}
          {children}
        </Dropdown.Button>
      ) : (
        <Button className={classNames(style.button, className)} {...props}>
          {text}
          {children}
        </Button>
      )}
    </Tooltip>
  );
};

export default ButtonDesign;
