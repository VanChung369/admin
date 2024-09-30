import { CopyOutlined } from '@ant-design/icons';
import { shortenIfAddress } from '@thirdweb-dev/react';
import { useIntl } from '@umijs/max';
import { message } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
const ShortenAddress: FC<{
  address?: string;
  extraShort?: boolean;
  className?: any;
  children?: any;
  isCopy?: boolean;
}> = ({ address, extraShort = false, className, children, isCopy, ...props }) => {
  const addressShorten = shortenIfAddress(address, extraShort);
  const intl = useIntl();
  return (
    <div className={classNames(className)} {...props}>
      {addressShorten ? addressShorten : ADDRESS_ZERO}
      {isCopy && (
        <CopyOutlined
          onClick={() => {
            message.success(intl.formatMessage({ id: 'common.text.copy.success' }));
            return navigator.clipboard.writeText(address!);
          }}
        />
      )}
      {children}
    </div>
  );
};

export default ShortenAddress;
