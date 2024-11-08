import LoadingWrapper from '@/components/LoadingWrapper';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useRef } from 'react';

const SaleOrderCreation = () => {
  const intl = useIntl();
  const formikRef = useRef<any>(null);
  const { id } = useParams();

  return (
    <PageContainer title={false}>
      <LoadingWrapper loading={false}>create</LoadingWrapper>
    </PageContainer>
  );
};

export default SaleOrderCreation;
