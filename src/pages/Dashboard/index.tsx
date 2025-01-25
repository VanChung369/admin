import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import styleLess from './index.less';
import SaleAnalytics from './components/Analytics';
import Overview from './components/Overview';
import RecentTransaction from './components/RecentTransactions';
import TopNFTs from './components/TopNfts';

const Dashboard: React.FC = () => {
  return (
    <PageContainer>
      <Row gutter={[20, 20]}>
        <Col md={14} sm={24}>
          <SaleAnalytics />
        </Col>
        <Col md={10} sm={24}>
          <Overview />
        </Col>
      </Row>
      <Row gutter={[20, 20]} className={styleLess.dashboard__row}>
        <Col md={14} sm={24}>
          <RecentTransaction />
        </Col>
        <Col md={10} sm={24}>
          <TopNFTs />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
