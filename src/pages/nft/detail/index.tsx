import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetNFT } from '../hooks';
import LoadingWrapper from '@/components/LoadingWrapper';
import PageHeader from '@/components/PageHeader';
import ROUTES_PATH from '@/constants/routesPath';
import styleLess from './index.less';
import NFTWarning from './components/NFTWarning';
import NFTButtons from './components/NFTButtons';
import NFTContent from './components/NFTContent';
import formatMessage from '@/components/FormatMessage';

const NFTDetail: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useGetNFT(id);
  const onBackClick = () => navigate(ROUTES_PATH.NFT);

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E9' },
        type: 'error',
      });
      navigate(ROUTES_PATH.DASHBOARD);
    }
  }, [error]);

  return (
    <PageContainer title={false} className={styleLess.nft_detail}>
      <LoadingWrapper loading={loading}>
        <NFTWarning saleOrder={data?.saleOrder} token={data?.token} status={data?.status} />
        <div className={styleLess.nft_detail__header}>
          <PageHeader
            showBack
            title={intl.formatMessage({
              id: 'NFT.detail',
            })}
            onBack={onBackClick}
          />
          <NFTButtons />
        </div>
        <div className={styleLess.nft_detail__content}>
          <NFTContent />
        </div>
      </LoadingWrapper>
    </PageContainer>
  );
};

export default NFTDetail;
