import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useNavigate, useParams } from 'react-router-dom';
import { NFT_MANAGEMENT_COLUMN, NFT_MANAGEMENT_FIELD, NFT_TABS } from '../constants';
import { LENGTH_CONSTANTS } from '@/constants';
import styleLess from './index.less';
import ROUTES_PATH from '@/constants/routesPath';
import NFT_721 from './components/NFT_721';
import NFT_1155 from './components/NFT_1155';
import ButtonWrapper from '@/components/ButtonWrapper';
import { FileAddOutlined } from '@ant-design/icons';
import TabWapper from '@/components/TabWrapper';
import { Card } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

const { KEYWORD, STATUS, PAGE, LIMIT, TYPE } = NFT_MANAGEMENT_FIELD;
const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

const {
  NO,
  CREATED_AT,
  NFT_ID,
  NFT_NAME,
  TOTAL_SUPPLY,
  TOTAL_MINTED,
  ON_SALE_QUANTITY,
  NFT_STATUS,
  ACTIONS,
} = NFT_MANAGEMENT_COLUMN;

const defaultValue = [
  NO,
  CREATED_AT,
  NFT_ID,
  NFT_NAME,
  TOTAL_SUPPLY,
  TOTAL_MINTED,
  ON_SALE_QUANTITY,
  NFT_STATUS,
  ACTIONS,
];

const initParams = {
  [KEYWORD]: '',
  [STATUS]: null,
  [PAGE]: DEFAULT_PAGE,
  [LIMIT]: DEFAULT_PAGE_SIZE,
};

const NFTManagement: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [primaryColumn, setPrimaryColumn] = useState(defaultValue);
  const [activeTab, setActiveTab] = useState(NFT_TABS.ERC721.key);

  const [erc721, setErc721] = useState({
    params: { ...initParams, [TYPE]: NFT_TABS.ERC721.type },
  });

  const [erc1155, setErc1155] = useState({
    params: { ...initParams, [TYPE]: NFT_TABS.ERC1155.type },
  });

  const handleChangeTab = (value: string) => setActiveTab(value);

  const handleSubmit = (values: any) => {
    const fncTab = activeTab === NFT_TABS.ERC721.key ? setErc721 : setErc1155;
    const objTab = activeTab === NFT_TABS.ERC721.key ? erc721 : erc1155;
    fncTab({
      ...objTab,
      params: {
        ...objTab?.params,
        ...values,
      },
    });
  };

  const handleRedirectNFTCreationPage = () => navigate(ROUTES_PATH.NFT_CREATION);
  const getListColumn = (listColumn: any) => setPrimaryColumn(listColumn);

  const primaryColumnsItem = [
    { label: intl.formatMessage({ id: 'NFT.management.no' }), value: NO, disabled: true },
    { label: intl.formatMessage({ id: 'NFT.management.create.date' }), value: CREATED_AT },
    { label: intl.formatMessage({ id: 'NFT.management.id' }), value: NFT_ID },
    { label: intl.formatMessage({ id: 'NFT.management.name' }), value: NFT_NAME },
    { label: intl.formatMessage({ id: 'NFT.management.supply' }), value: TOTAL_SUPPLY },
    { label: intl.formatMessage({ id: 'NFT.management.minted' }), value: TOTAL_MINTED },
    { label: intl.formatMessage({ id: 'NFT.management.quantity' }), value: ON_SALE_QUANTITY },
    { label: intl.formatMessage({ id: 'NFT.management.status' }), value: NFT_STATUS },
    { label: intl.formatMessage({ id: 'NFT.management.action' }), value: ACTIONS, disabled: true },
  ];

  const listTab = [
    {
      key: NFT_TABS.ERC721.key,
      tab: intl.formatMessage({ id: NFT_TABS.ERC721.label }),
      content: (
        <NFT_721
          values={erc721}
          onSubmit={handleSubmit}
          getListColumn={getListColumn}
          listColumn={primaryColumn}
          columnsItem={primaryColumnsItem}
        />
      ),
      disabled: queryClient.isFetching(),
    },
    {
      key: NFT_TABS.ERC1155.key,
      tab: intl.formatMessage({ id: NFT_TABS.ERC1155.label }),
      content: (
        <NFT_1155
          values={erc1155}
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
      title={intl.formatMessage({ id: 'NFT.management' })}
      className={styleLess.nft_management}
    >
      <div className={styleLess.nft_management__button}>
        <ButtonWrapper
          prefixIcon={<FileAddOutlined />}
          text={intl.formatMessage({ id: 'NFT.create' })}
          onClick={handleRedirectNFTCreationPage}
          variant="primary"
          className={styleLess.nft_management__button__create}
        />
      </div>
      <Card className={styleLess.nft_management__tab}>
        <TabWapper onChangeTab={handleChangeTab} activeKey={activeTab} listTab={listTab} />
      </Card>
    </PageContainer>
  );
};

export default NFTManagement;
