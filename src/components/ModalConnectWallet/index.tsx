import { useAppDispatch, useAppSelector } from '@/hooks';
import { useConnectWallet } from '@/hooks/hook-customs/useConnectWallet';
import selectedConnection from '@/redux/connection/selector';
import { handleSetConnectModal, handleSetLoadingMetamask } from '@/redux/connection/slice';
import { useIntl } from '@umijs/max';
import { Typography, Modal, Image } from 'antd';
import { useEffect } from 'react';
import LoadingIcon from '@/resources/images/loading.gif';
import NotFoundMetamaskIcon from '@/resources/images/not_found_metamask.png';
import style from './index.less';
import { METAMASK_DOWLOAD } from '@/constants';

declare let window: any;

const { Paragraph } = Typography;

const ModalConnectWallet = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { isConnectingWallet } = useAppSelector(selectedConnection.getConnection);
  const { handleConnect } = useConnectWallet();
  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));
  const handleLoadingMetamask = () => dispatch(handleSetLoadingMetamask(false));

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  const handleConnectMetamask = () => {
    handleConnect();

    if (window.ethereum) {
      handleHideModalConnectWallet();
    }
  };

  useEffect(() => {
    if (isConnectingWallet) {
      handleConnectMetamask();
    }
  }, [isConnectingWallet]);

  const renderNoMetamask = () => (
    <div className={style.connect}>
      {isEthereum ? (
        <div className={style.connect__loading}>
          <Paragraph className={style.connect__loading_title}>
            {intl.formatMessage({
              id: 'login.connect.metamask',
            })}
          </Paragraph>
          <div className={style.connect__loading_image}>
            <Image
              className={style.connect__loading_icon}
              preview={false}
              height={150}
              width={150}
              src={LoadingIcon}
              alt="loading"
            />
          </div>
          <Paragraph className={style.connect__loading_subtitle}>
            {intl.formatMessage({
              id: 'login.connect.metamask.subtitle',
            })}
          </Paragraph>
        </div>
      ) : (
        <div className={style.connect__not_found}>
          <Paragraph className={style.connect__not_found_title}>
            {intl.formatMessage({
              id: 'login.metamask.not.found',
            })}
          </Paragraph>

          <div className={style.connect__not_found_image}>
            <Image
              className={style.connect__not_found_icon}
              preview={false}
              height={150}
              width={150}
              src={NotFoundMetamaskIcon}
              alt="metamask not found"
            />
          </div>
          <Paragraph className={style.connect__not_found_subtitle}>
            {intl.formatMessage({
              id: 'login.metamask.not.found.subtitle',
            })}
          </Paragraph>

          <div className={style.connect__not_found_download}>
            <a target="_blank" href={METAMASK_DOWLOAD} className="link" rel="noreferrer">
              {intl.formatMessage({
                id: 'login.metamask.install',
              })}
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      className={style.container}
      onCancel={handleLoadingMetamask}
      footer={false}
      width={400}
      open={isConnectingWallet}
    >
      {renderNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;
