import React, { Fragment, useMemo, useState } from 'react';
import { MIN_VALUE_TOTAL_COPIES, ZERO_VALUE } from '@/constants/input';
import { useIntl, useParams } from '@umijs/max';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTransaction, useUpdateTransaction } from '@/pages/nft/hooks';
import { NFT_TRANSACTION_TYPE } from '@/pages/nft/constants';
import { SOCKET_EVENT } from '@/constants';
import { useSocket } from '@/hooks/hook-customs/useSocket';
import MetamaskService from '@/services/blockchain';
import ButtonWrapper from '@/components/ButtonWrapper';
import ModalStep from '@/components/ModalStep';
import styleLess from './index.less';
import { useSigner } from '@thirdweb-dev/react';
import { CANCEL_SALE_STEPS } from '@/pages/SaleOrder/constants';
import ModalConfirm from '@/components/ModalConfirm';

const { PROCESSING, SUCCESSFUL, FAILED } = CANCEL_SALE_STEPS;

const CancelSaleButton = ({ visiblity }: { visiblity?: boolean }) => {
  const intl = useIntl();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const signer = useSigner();
  const query: any = queryClient.getQueryData(['getSaleOrder', id]);

  const [visible, setVisible] = useState(false);
  const [stepCancel, setStepCancel] = useState(ZERO_VALUE);
  const [transactionId, setTransactionId] = useState('');
  const [isCompletedCancel, setIsCompletedCancel] = useState(false);

  const { loading: loadingCreateTransaction, onCreateTransaction } = useCreateTransaction();
  const { loading: loadingUpdateTransaction, onUpdateTransaction } = useUpdateTransaction();

  const failed = FAILED === stepCancel;
  const successful = SUCCESSFUL === stepCancel;
  const processing = PROCESSING === stepCancel;

  const handleToggleCancelSale = () => setVisible(!visible);
  const handleUpdateCancelSaleStep = (value: number) => setStepCancel(value);

  const handleClosedCancelSaleModal = () => {
    handleUpdateCancelSaleStep(ZERO_VALUE);
    setIsCompletedCancel(false);
  };

  const handleCancelSaleError = () => {
    console.log('handlecancelError');
    handleUpdateCancelSaleStep(FAILED);
  };

  const handleShowCancelSuccess = () => {
    setIsCompletedCancel(true);
    handleUpdateCancelSaleStep(SUCCESSFUL);
    queryClient.refetchQueries({
      queryKey: ['getSaleOrder', id],
      type: 'active',
      exact: true,
    });
  };

  const handleCancelSuccess = () => {
    if (!isCompletedCancel) {
      handleShowCancelSuccess();
    }
  };

  const handleCompleteCancel = (transactionId: string, data: { hash: string; status: string }) => {
    onUpdateTransaction({
      id: transactionId,
      data: data,
      onSuccess: handleCancelSuccess,
      onError: handleCancelSaleError,
    });
  };

  const handleEvent = (data: any) => {
    if (!isCompletedCancel && data?.transactionId === transactionId) {
      handleShowCancelSuccess();
    }
  };

  useSocket({
    event: SOCKET_EVENT.REMOVE_FROM_SALE,
    handleEvent,
    dependences: [transactionId, isCompletedCancel],
  });

  const handleApproveCancelSale = async (transactionId: string, data?: any) => {
    setTransactionId(transactionId);
    const wallet = new MetamaskService().getInstance();
    await wallet.cancelSellOrder({
      signer: signer,
      data,
      onCallback: (data: any) => handleCompleteCancel(transactionId, data),
      onCancelMetamask: handleClosedCancelSaleModal,
      onError: handleCancelSaleError,
    });
  };

  const handleSubmit = (values: any) => {
    setStepCancel(PROCESSING);
    handleToggleCancelSale();
    onCreateTransaction({
      data: {
        type: NFT_TRANSACTION_TYPE.DELISTED,
        transactionId: query?.transactionId,
      },
      onSuccess: (id: string, data: any) => handleApproveCancelSale(id, data),
      onError: handleCancelSaleError,
    });
  };

  return (
    <Fragment>
      {visiblity && (
        <ButtonWrapper
          className={styleLess.button_cancel_sale}
          text={intl.formatMessage({ id: 'sale.order.detail.cancel.order' })}
          variant="primary"
          onClick={handleToggleCancelSale}
        />
      )}
      <ModalConfirm
        visible={visible}
        title={intl.formatMessage({ id: 'sale.order.detail.cancel.order' })}
        onClose={handleToggleCancelSale}
        onConfirm={handleSubmit}
        decsription={intl.formatMessage({ id: 'sale.order.cancel.order.description' })}
        confirmText={intl.formatMessage({ id: 'sale.order.cancel.order.process' })}
      />

      <ModalStep
        visible={ZERO_VALUE !== stepCancel}
        failed={failed}
        successful={successful}
        processing={processing}
        showCloseIcon={failed || successful}
        maskClosable={failed || successful}
        onFailedClose={handleClosedCancelSaleModal}
        onSuccessfulClose={handleClosedCancelSaleModal}
        successfulDescription={intl.formatMessage({ id: 'sale.order.cancel.order.success' })}
        innerHtml
      />
    </Fragment>
  );
};

export default CancelSaleButton;
