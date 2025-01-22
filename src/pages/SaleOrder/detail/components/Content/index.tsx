import { NFT_PROFILE_TABS, TABLE_CONTENT_TABS } from '@/pages/nft/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import styleLess from './index.less';
import SaleOrder from '../SaleOrder';
const SaleOrderContent = () => {
  const intl = useIntl();

  return (
    <div className={styleLess.sale_order_detail}>
      <Card>
        <Row gutter={26}>
          <Col lg={24} md={24} xs={24} xl={24} xxl={24}>
            <SaleOrder />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SaleOrderContent;
