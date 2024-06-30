import React, { useEffect, FC } from 'react';
import { Typography, Spin, Modal } from 'antd';
import { useAppSelector } from '@/hooks';
import selectedConnection from '@/redux/connection/selector';
import { useSwitchChain } from '@thirdweb-dev/react';

const { Paragraph } = Typography;

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = () => {
  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);
  const switchChain = useSwitchChain();

  return (
    <Modal open={isWrongNetwork} maskClosable={false} destroyOnClose>
      <div className="wrong-network-modal">
        <button onClick={() => switchChain(80002)}>Switch to Goerli</button>
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
