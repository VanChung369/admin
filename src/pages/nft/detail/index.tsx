import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';

const NFTDetail: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = useParams();

  return <PageContainer>welcome</PageContainer>;
};

export default NFTDetail;
