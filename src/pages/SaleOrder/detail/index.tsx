import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingWrapper from '@/components/LoadingWrapper';
import PageHeader from '@/components/PageHeader';
import ROUTES_PATH from '@/constants/routesPath';
import styleLess from './index.less';
import formatMessage from '@/components/FormatMessage';
import { useGetSaleOrder } from '../hooks';
import SaleOrderContent from './components/Content';
import CancelSaleButton from './components/CancelButton';
import { NFT_STATUS } from '@/pages/nft/constants';
import { SALE_ORDER_STATUS } from '../constants';

const NFTDetail: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useGetSaleOrder(id);
  const isVisiblity =
    NFT_STATUS[1].value === data?.nft?.status && SALE_ORDER_STATUS[1].value === data?.status;
  const onBackClick = () => navigate(ROUTES_PATH.SALE);

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E14' },
        type: 'error',
      });
      navigate(ROUTES_PATH.SALE);
    }
  }, [error]);

  return (
    <PageContainer title={false} className={styleLess.sale_detail}>
      <LoadingWrapper loading={loading}>
        <div className={styleLess.sale_detail__header}>
          <PageHeader
            showBack
            title={intl.formatMessage({
              id: 'sale.order.detail',
            })}
            onBack={onBackClick}
          />
          <div className={styleLess.sale_detail__cancel}>
            <CancelSaleButton visiblity={isVisiblity} />
          </div>
        </div>
        <div className={styleLess.sale_detail__content}>
          <SaleOrderContent />
        </div>
      </LoadingWrapper>
    </PageContainer>
  );
};

export default NFTDetail;
