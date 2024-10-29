import React, { Fragment, useMemo, useState } from 'react';
import MintNFTModal from './Modal';
import { MIN_VALUE_TOTAL_COPIES, ZERO_VALUE } from '@/constants/input';
import { useIntl, useParams } from '@umijs/max';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTransaction, useUpdateTransaction } from '@/pages/nft/hooks';
import { NFT_MINTED_FIELD, NFT_TRANSACTION_TYPE, SALE_STEPS } from '@/pages/nft/constants';
import { SOCKET_EVENT } from '@/constants';
import { useSocket } from '@/hooks/hook-customs/useSocket';
import MetamaskService from '@/services/blockchain';
import { EXTERNAL_URL } from '@/constants/routesPath';
import ButtonWrapper from '@/components/ButtonWrapper';
import ModalStep from '@/components/ModalStep';
import styleLess from './index.less';
import { useSigner } from '@thirdweb-dev/react';

const { PROCESSING, SUCCESSFUL, FAILED } = SALE_STEPS;
const { QUANTITY, TO_ADDRESS } = NFT_MINTED_FIELD;

const MintNFTButton = ({ visiblity }: { visiblity?: boolean }) => {
  const intl = useIntl();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const signer = useSigner();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const [quantity, setQuantity] = useState('');
  const [visible, setVisible] = useState(false);
  const [stepMint, setStepMint] = useState(ZERO_VALUE);
  const [transactionId, setTransactionId] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [isCompletedMint, setIsCompletedMint] = useState(false);

  const { loading: loadingCreateTransaction, onCreateTransaction } = useCreateTransaction();
  const { loading: loadingUpdateTransaction, onUpdateTransaction } = useUpdateTransaction();

  const failed = FAILED === stepMint;
  const successful = SUCCESSFUL === stepMint;
  const processing = PROCESSING === stepMint;

  const handleToggleMintNFT = () => setVisible(!visible);
  const handleUpdateMintedStep = (value: number) => setStepMint(value);

  const handleCloseMintedModal = () => {
    handleUpdateMintedStep(ZERO_VALUE);
    setIsCompletedMint(false);
  };

  const handleMintedError = () => {
    console.log('handleMintedError');
    handleUpdateMintedStep(FAILED);
  };

  const handleShowMintedSuccess = () => {
    setIsCompletedMint(true);
    handleUpdateMintedStep(SUCCESSFUL);
    queryClient.refetchQueries({
      queryKey: ['getNFT', id],
      type: 'active',
      exact: true,
    });
    queryClient.refetchQueries({
      queryKey: ['getListNFTOwner'],
      type: 'active',
    });
  };

  const handleMintedSuccess = () => {
    if (!isCompletedMint) {
      handleShowMintedSuccess();
    }
  };

  const handleCompleteMinted = (transactionId: string, data: { hash: string; status: string }) => {
    setTransactionHash(data?.hash);

    onUpdateTransaction({
      id: transactionId,
      data: data,
      onSuccess: handleMintedSuccess,
      onError: handleMintedError,
    });
  };

  const handleEvent = (data: any) => {
    if (!isCompletedMint && data?.transactionId === transactionId) {
      handleShowMintedSuccess();
    }
  };

  useSocket({
    event: SOCKET_EVENT.ADMIN_MINT,
    handleEvent,
    dependences: [transactionId, isCompletedMint],
  });

  const handleApproveMinted = async (transactionId: string, data?: any) => {
    setTransactionId(transactionId);
    const wallet = new MetamaskService().getInstance();
    await wallet.mintNFT({
      signer: signer,
      data,
      onCallback: (data: any) => handleCompleteMinted(transactionId, data),
      onCancelMetamask: handleCloseMintedModal,
      onError: handleMintedError,
    });
  };

  const handleSubmit = (values: any) => {
    setQuantity(values?.[QUANTITY] as string);
    setStepMint(PROCESSING);
    handleToggleMintNFT();
    onCreateTransaction({
      data: {
        type: NFT_TRANSACTION_TYPE.ADMIN_MINTED,
        nftId: id,
        [QUANTITY]: Number(values?.[QUANTITY]),
        [TO_ADDRESS]: values?.[TO_ADDRESS]?.trim(),
      },
      onSuccess: (id: string, data: any) => handleApproveMinted(id, data),
      onError: handleMintedError,
    });
  };

  const renderMintSuccessText = useMemo(
    () => (
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(
              {
                id:
                  parseInt(quantity) > MIN_VALUE_TOTAL_COPIES
                    ? 'NFT.mint.success'
                    : 'NFT.mint.single.success',
              },
              { number: quantity, name: query?.name },
            ),
          }}
        />
        <a
          href={`${EXTERNAL_URL.POLYGON_SCAN}/${transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <ButtonWrapper
            className={styleLess.button_view_polygon}
            variant="primary"
            text={intl.formatMessage({ id: 'NFT.mint.view.ploygon' })}
          />
        </a>
      </div>
    ),
    [quantity, transactionHash, query],
  );

  return (
    <Fragment>
      {visiblity && (
        <ButtonWrapper
          className={styleLess.button_mint_nft}
          text={intl.formatMessage({ id: 'NFT.mint' })}
          variant="primary"
          onClick={handleToggleMintNFT}
        />
      )}

      <MintNFTModal
        visible={visible}
        onClose={handleToggleMintNFT}
        title={intl.formatMessage({ id: 'NFT.mint' })}
        onSubmit={handleSubmit}
      />

      <ModalStep
        visible={ZERO_VALUE !== stepMint}
        failed={failed}
        successful={successful}
        processing={processing}
        showCloseIcon={failed || successful}
        maskClosable={failed || successful}
        onFailedClose={handleCloseMintedModal}
        onSuccessfulClose={handleCloseMintedModal}
        successfulDescription={renderMintSuccessText}
        innerHtml
      />
    </Fragment>
  );
};

export default MintNFTButton;
