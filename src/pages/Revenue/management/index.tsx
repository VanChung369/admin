import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate } from 'react-router-dom';
import { REVENUE_MANAGEMENT_COLUMN, REVENUE_MANAGEMENT_FIELD, REVENUE_TABS } from '../constants';
import { LENGTH_CONSTANTS } from '@/constants';
import styleLess from './index.less';
import ButtonWrapper from '@/components/ButtonWrapper';
import { FileAddOutlined } from '@ant-design/icons';
import TabWapper from '@/components/TabWrapper';
import { Card } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import Resell from './components/Resell';
import Sell from './components/Sell';
import ExportModal from './components/Export';

const { PAGE, LIMIT, KEYWORD, TYPE, FROM, UNTIL } = REVENUE_MANAGEMENT_FIELD;
const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

const {
  NO,
  SELLER,
  SALE_DATE,
  BUYER,
  QUANTITY,
  NFT_ID,
  PRICE,
  NFT_NAME,
  SUBTOTAL,
  ACTIONS,
  TYPE: TYPE_COLUMN,
} = REVENUE_MANAGEMENT_COLUMN;

const defaultValue = [NO, SALE_DATE, QUANTITY, PRICE, NFT_NAME, SUBTOTAL, ACTIONS];

const initParams = {
  [KEYWORD]: '',
  [FROM]: null,
  [UNTIL]: null,
  [PAGE]: DEFAULT_PAGE,
  [LIMIT]: DEFAULT_PAGE_SIZE,
};

const RevenueManagement: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [primaryColumn, setPrimaryColumn] = useState(defaultValue);
  const [visible, setVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(REVENUE_TABS.PRIMARY.key);

  const [sell, setSell] = useState({
    params: { ...initParams, [TYPE]: REVENUE_TABS.PRIMARY.type },
  });

  const [resell, setResell] = useState({
    params: { ...initParams, [TYPE]: REVENUE_TABS.SECONDARY.type },
  });

  const handleChangeTab = (value: string) => setActiveTab(value);

  const handleToggleExportModal = () => {
    setVisible(!visible);
  };

  const handleSubmit = (values: any) => {
    const fncTab = activeTab === REVENUE_TABS.PRIMARY.key ? setSell : setResell;
    const objTab = activeTab === REVENUE_TABS.SECONDARY.key ? sell : resell;
    fncTab({
      ...objTab,
      params: {
        ...objTab?.params,
        ...values,
      },
    });
  };

  const getListColumn = (listColumn: any) => setPrimaryColumn(listColumn);

  const primaryColumnsItem = [
    { label: intl.formatMessage({ id: 'NFT.management.action' }), value: ACTIONS, disabled: true },
    { label: intl.formatMessage({ id: 'revenue.management.no' }), value: NO, disabled: true },
    { label: intl.formatMessage({ id: 'revenue.management.seller' }), value: SELLER },
    { label: intl.formatMessage({ id: 'revenue.management.sale.date' }), value: SALE_DATE },
    { label: intl.formatMessage({ id: 'revenue.management.buyer' }), value: BUYER },
    { label: intl.formatMessage({ id: 'revenue.management.type' }), value: TYPE_COLUMN },
    { label: intl.formatMessage({ id: 'revenue.management.quantity' }), value: QUANTITY },
    { label: intl.formatMessage({ id: 'revenue.management.nft.id' }), value: NFT_ID },
    { label: intl.formatMessage({ id: 'revenue.management.price' }), value: PRICE },
    { label: intl.formatMessage({ id: 'revenue.management.nft.name' }), value: NFT_NAME },
    { label: intl.formatMessage({ id: 'revenue.management.subtotal' }), value: SUBTOTAL },
    {
      label: intl.formatMessage({ id: 'revenue.management.actions' }),
      value: ACTIONS,
      disabled: true,
    },
  ];

  const listTab = [
    {
      key: REVENUE_TABS.PRIMARY.key,
      tab: intl.formatMessage({ id: REVENUE_TABS.PRIMARY.label }),
      content: (
        <Sell
          values={sell}
          onSubmit={handleSubmit}
          getListColumn={getListColumn}
          listColumn={primaryColumn}
          columnsItem={primaryColumnsItem}
        />
      ),
      disabled: queryClient.isFetching(),
    },
    {
      key: REVENUE_TABS.SECONDARY.key,
      tab: intl.formatMessage({ id: REVENUE_TABS.SECONDARY.label }),
      content: (
        <Resell
          values={resell}
          onSubmit={handleSubmit}
          getListColumn={getListColumn}
          listColumn={primaryColumn}
          columnsItem={primaryColumnsItem}
        />
      ),
      disabled: queryClient.isFetching(),
    },
  ];

  return (
    <PageContainer
      title={intl.formatMessage({ id: 'revenue.management' })}
      className={styleLess.revenue_management}
    >
      <div className={styleLess.revenue_management__button}>
        <ButtonWrapper
          prefixIcon={<FileAddOutlined />}
          text={intl.formatMessage({ id: 'revenue.management.export' })}
          onClick={handleToggleExportModal}
          variant="primary"
          className={styleLess.revenue_management__button__create}
        />
      </div>
      <Card className={styleLess.revenue_management__tab}>
        <TabWapper onChangeTab={handleChangeTab} activeKey={activeTab} listTab={listTab} />
      </Card>
      <ExportModal visible={visible} onClose={handleToggleExportModal} />
    </PageContainer>
  );
};

export default RevenueManagement;
