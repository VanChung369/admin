import React, { useState } from 'react';
import { useIntl } from '@umijs/max';
import styleLess from './index.less';
import NFT_721 from './components/NFT_721';
import NFT_1155 from './components/NFT_1155';
import TabWapper from '@/components/TabWrapper';
import { Card } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { NFT_TABS } from '@/pages/nft/constants';

const TopNFTs: React.FC = () => {
  const intl = useIntl();

  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(NFT_TABS.ERC721.key);

  const handleChangeTab = (value: string) => setActiveTab(value);

  const listTab = [
    {
      key: NFT_TABS.ERC721.key,
      tab: intl.formatMessage({ id: NFT_TABS.ERC721.label }),
      content: <NFT_721 />,
      disabled: queryClient.isFetching(),
    },
    {
      key: NFT_TABS.ERC1155.key,
      tab: intl.formatMessage({ id: NFT_TABS.ERC1155.label }),
      content: <NFT_1155 />,
      disabled: queryClient.isFetching(),
    },
  ];

  return (
    <Card className={styleLess.top_nft}>
      <TabWapper
        size={'small'}
        tabBarExtraContent={
          <div className={styleLess.top_nft__title}>
            {intl.formatMessage({ id: 'dashboard.top.nfts' })}
          </div>
        }
        destroyInactiveTabPane
        onChangeTab={handleChangeTab}
        activeKey={activeTab}
        listTab={listTab}
      />
    </Card>
  );
};

export default TopNFTs;
