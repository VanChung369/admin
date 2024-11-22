import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import { LENGTH_CONSTANTS } from '@/constants';
import styleLess from './index.less';
import ROUTES_PATH from '@/constants/routesPath';
import ButtonWrapper from '@/components/ButtonWrapper';
import { FileAddOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { SALE_ORDER_MANAGEMENT_COLUMN, SALE_ORDER_MANAGEMENT_FIELD } from '../constants';
import SaleOrder from './components/SaleOrder';

const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

const { KEYWORD, STATUS, METHOD, PAGE, LIMIT } = SALE_ORDER_MANAGEMENT_FIELD;

const {
  NO,
  CREATED_AT,
  FROM_ADDRESS,
  SOLD,
  QUANTITY,
  NFT,
  REMAIN,
  SALE_METHOD,
  UNIT_PRICE,
  SALE_STATUS,
  START_DATE,
  END_DATE,
  ACTIONS,
} = SALE_ORDER_MANAGEMENT_COLUMN;

const defaultValue = [
  NO,
  SALE_STATUS,
  NFT,
  SOLD,
  QUANTITY,
  REMAIN,
  SALE_METHOD,
  UNIT_PRICE,
  ACTIONS,
];

const initParams = {
  [KEYWORD]: '',
  [STATUS]: null,
  [METHOD]: null,
  [PAGE]: DEFAULT_PAGE,
  [LIMIT]: DEFAULT_PAGE_SIZE,
};

const SaleOrderManagement: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [primaryColumn, setPrimaryColumn] = useState(defaultValue);
  const [params, setParams] = useState(initParams);

  const handleRedirectSaleOrderCreationPage = () => navigate(ROUTES_PATH.SALE_CREATION);
  const getListColumn = (listColumn: any) => setPrimaryColumn(listColumn);

  const primaryColumnsItem = [
    { label: intl.formatMessage({ id: 'sale.order.management.no' }), value: NO, disabled: true },
    { label: intl.formatMessage({ id: 'sale.order.management.created.by' }), value: FROM_ADDRESS },
    { label: intl.formatMessage({ id: 'sale.order.management.nft.name' }), value: NFT },
    { label: intl.formatMessage({ id: 'sale.order.management.quantity' }), value: QUANTITY },
    { label: intl.formatMessage({ id: 'sale.order.management.sold' }), value: SOLD },
    { label: intl.formatMessage({ id: 'sale.order.management.remain' }), value: REMAIN },
    { label: intl.formatMessage({ id: 'sale.order.management.unit.price' }), value: UNIT_PRICE },
    { label: intl.formatMessage({ id: 'sale.order.management.start.date' }), value: START_DATE },
    { label: intl.formatMessage({ id: 'sale.order.management.end.date' }), value: END_DATE },
    { label: intl.formatMessage({ id: 'sale.order.management.created.at' }), value: CREATED_AT },
    { label: intl.formatMessage({ id: 'sale.order.management.status' }), value: SALE_STATUS },
    { label: intl.formatMessage({ id: 'sale.order.management.method' }), value: SALE_METHOD },
    {
      label: intl.formatMessage({ id: 'sale.order.management.actions' }),
      value: ACTIONS,
      disabled: true,
    },
  ];

  const handleSubmit = (values: any) => {
    setParams({
      ...initParams,
      ...values,
    });
  };

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'sale.order.management' })}
      className={styleLess.sale_order_management}
    >
      <div className={styleLess.sale_order_management__button}>
        <ButtonWrapper
          prefixIcon={<FileAddOutlined />}
          text={intl.formatMessage({ id: 'sale.order.create' })}
          onClick={handleRedirectSaleOrderCreationPage}
          variant="primary"
          className={styleLess.sale_order_management__button__create}
        />
      </div>
      <Card className={styleLess.sale_order_management__table}>
        <SaleOrder
          params={params}
          getListColumn={getListColumn}
          listColumn={primaryColumn}
          columnsItem={primaryColumnsItem}
          onSubmit={handleSubmit}
        />
      </Card>
    </PageContainer>
  );
};

export default SaleOrderManagement;
