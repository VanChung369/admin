import ModalConfirm from '@/components/ModalConfirm';
import { useIntl, useNavigate } from '@umijs/max';
import React from 'react';

type ModalUnsavedChangeProps = {
  visible: boolean;
  onClose?: any;
  backUrl: string;
  afterClose?: any;
  isModalForm?: boolean;
  confirmModalForm?: any;
};

const ModalUnsavedChange = ({
  visible,
  onClose,
  backUrl,
  afterClose,
  isModalForm,
  confirmModalForm,
}: ModalUnsavedChangeProps) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const onConfirm = () => {
    if (!isModalForm) {
      navigate(backUrl);
    } else {
      onClose();
      confirmModalForm();
    }
  };

  return (
    <ModalConfirm
      visible={visible}
      title={intl.formatMessage({ id: 'NFT.update.unsave' })}
      onClose={onClose}
      onConfirm={onConfirm}
      decsription={intl.formatMessage({ id: 'NFT.update.unsave.description' })}
      confirmText={intl.formatMessage({ id: 'NFT.update.leave.page' })}
      afterClose={afterClose}
    />
  );
};

export default ModalUnsavedChange;
