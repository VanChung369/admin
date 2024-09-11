import { shortenIfAddress } from '@thirdweb-dev/react';
import classNames from 'classnames';
import { FC } from 'react';

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
const ShortenAddress: FC<{
  address?: string;
  extraShort?: boolean;
  className?: any;
  children?: any;
}> = ({ address, extraShort = false, className, children, ...props }) => {
  const addressShorten = shortenIfAddress(address, extraShort);
  return (
    <div className={classNames(className)} {...props}>
      {addressShorten ? addressShorten : ADDRESS_ZERO}
      {children}
    </div>
  );
};

export default ShortenAddress;
