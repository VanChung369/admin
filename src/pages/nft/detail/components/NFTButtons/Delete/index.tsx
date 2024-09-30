import formatMessage from '@/components/FormatMessage';
import ModalConfirm from '@/components/ModalConfirm';
import ROUTES_PATH from '@/constants/routesPath';
import { useDeleteNFT } from '@/pages/nft/hooks';
import { useIntl, useParams } from '@umijs/max';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NFTDeleteProps = {
  NFTName?: string;
  className?: any;
};

const NFTDelete = ({ NFTName, className }: NFTDeleteProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, onDeleteNFT } = useDeleteNFT();
  const [visible, setVisible] = useState(false);

  const handleToggleModalDelete = () => setVisible(!visible);

  const handleDeleteSuccessul = () => {
    navigate(ROUTES_PATH.NFT);
    handleToggleModalDelete();
    formatMessage({
      descriptor: { id: 'codeMessage.S2' },
      type: 'success',
    });
  };

  const handleDeleteError = () => {
    navigate(ROUTES_PATH.NFT);
    handleToggleModalDelete();
    formatMessage({
      descriptor: { id: 'codeMessage.E8' },
      type: 'error',
    });
  };

  const handleDeleteNFT = () => {
    onDeleteNFT({
      id: id,
      onSuccess: handleDeleteSuccessul,
      onError: handleDeleteError,
    });
  };

  return (
    <Fragment>
      <div className={className} onClick={handleToggleModalDelete}>
        {intl.formatMessage({ id: 'NFT.detail.action.delete' })}
      </div>
      <ModalConfirm
        visible={visible}
        onClose={handleToggleModalDelete}
        noCancel
        title={intl.formatMessage({ id: 'NFT.detail.action.delete' })}
        innerHtml
        decsription={intl.formatMessage(
          { id: 'NFT.detail.action.delete.description' },
          { name: NFTName },
        )}
        confirmText={intl.formatMessage({ id: 'NFT.detail.proceed.delete' })}
        onConfirm={handleDeleteNFT}
        loading={loading}
      />
    </Fragment>
  );
};

export default NFTDelete;
