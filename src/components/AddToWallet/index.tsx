import { FC } from 'react';
import style from './index.less';
import { AddToWalletProps } from './typings';
import { Button } from 'antd';
import classNames from 'classnames';
import MetaMaskLogo from '@/resources/svg/Metamask.svg';
import WalletConnectLogo from '@/resources/svg/WalletConnect.svg';
import CoinBaseLogo from '@/resources/svg/Coinbase.svg';
import WALLET_TYPE from '@/constants/walletType';

const AddToWallet: FC<AddToWalletProps> = ({
  afterIcon,
  className,
  text,
  href,
  walletType,
  ...props
}) => {
  let wallet: any = MetaMaskLogo;

  switch (walletType) {
    case WALLET_TYPE.METAMASK:
      wallet = MetaMaskLogo;
      break;
    case WALLET_TYPE.COIN_BASE:
      wallet = CoinBaseLogo;
      break;
    case WALLET_TYPE.WALLET_CONNECT:
      wallet = WalletConnectLogo;
      break;
  }

  return (
    <div className={style.button}>
      <Button className={classNames(className, style.button__content)} {...props}>
        <img src={wallet} className={style.button__icon} />
        <span className={style.button__text}>{text}</span>
        {afterIcon}
      </Button>
    </div>
  );
};

export default AddToWallet;
