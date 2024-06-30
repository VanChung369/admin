import { useAppDispatch, useAppSelector } from '@/hooks';
import { useConnectWallet } from '@/hooks/hook-customs/useConnectWallet';
import selectedConnection from '@/redux/connection/selector';
import { handleSetConnectModal } from '@/redux/connection/slice';
import { Typography, Spin, Modal } from 'antd';
import { useEffect, useState } from 'react';

declare let window: any;

const { Paragraph } = Typography;

const ModalConnectWallet = () => {
  const dispatch = useAppDispatch();
  const { isConnectingWallet } = useAppSelector(selectedConnection.getConnection);
  const { handleConnect } = useConnectWallet();

  const [isShowMetaMask, setIsShowMetaMask] = useState(false);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

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
    <div className="popup_metamask">
      {isEthereum ? (
        <div className="loading-metamask-modal">
          <Paragraph className="title">connect metamask</Paragraph>
        </div>
      ) : (
        <div className="metamask-notfound-modal">
          <Paragraph className="title">metamask not found</Paragraph>
          <Paragraph className="sub-title">metamask not found</Paragraph>

          <div className="footer">
            <a target="_blank" href={''} className="link" rel="noreferrer">
              dowload
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return <Modal open={isConnectingWallet}>{renderNoMetamask()}</Modal>;
};

export default ModalConnectWallet;
