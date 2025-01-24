import React, { useEffect, useState } from 'react';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingWrapper from '@/components/LoadingWrapper';
import ROUTES_PATH from '@/constants/routesPath';
import styleLess from './index.less';
import formatMessage from '@/components/FormatMessage';
import { DetailProps } from './typings';
import { useGetTransaction } from '../hooks';
import RevenueDetailModal from './components/DetailModal';

const RevenueDetail = ({ revenueId }: DetailProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { loading, error, data } = useGetTransaction(revenueId, visible);

  const handleShowDetailModal = () => {
    setVisible(true);
  };

  const handleCloseDetailModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E9' },
        type: 'error',
      });
      navigate(ROUTES_PATH.REVENUE);
    }
  }, [error]);

  return (
    <div className={styleLess.revenue_detail}>
      <LoadingWrapper loading={loading}>
        <div className={styleLess.revenue_detail__text} onClick={handleShowDetailModal}>
          {intl.formatMessage({ id: 'revenue.management.sale.details' })}
        </div>
        <RevenueDetailModal
          visible={visible}
          onClose={handleCloseDetailModal}
          dataRevenue={data}
          loading={loading}
        />
      </LoadingWrapper>
    </div>
  );
};

export default RevenueDetail;
