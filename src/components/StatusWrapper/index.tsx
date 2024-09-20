import { TYPE_TYPOGRAPHY } from '@/constants/type';
import { Badge } from 'antd';
import classnames from 'classnames';
import { FC } from 'react';
import style from './index.less';
import { StatusWrapperProps } from './typings';
import TypographyWrapper from '../TypographyWrapper';

const StatusWrapper: FC<StatusWrapperProps> = ({
  text,
  status = 'default',
  className,
  badge = false,
  ...props
}) => {
  return (
    <div className={classnames(style.status, [style[`status-${status}`]], className)} {...props}>
      {badge && <Badge status={status} />}
      <TypographyWrapper
        className={classnames([style[`text--color-${status}`]])}
        typeTypography={TYPE_TYPOGRAPHY.TEXT_ELLIPSIS}
        text={text}
        isShorten={true}
      />
    </div>
  );
};

export default StatusWrapper;
