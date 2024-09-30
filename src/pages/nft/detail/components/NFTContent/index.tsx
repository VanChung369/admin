import { NFT_PROFILE_TABS } from '@/pages/nft/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import React, { Fragment, useState } from 'react';
import PreviewImage from './PreviewImage';
import PreviewContent from './PreviewContent';
import { Card, Col, Row } from 'antd';
import TabWapper from '@/components/TabWrapper';
import Info from './Info';
import styleLess from './index.less';

const NFTContent = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(NFT_PROFILE_TABS.PREVIEW.key);
  const handleChangeTab = (value: string) => setActiveTab(value);

  const query: any = queryClient.getQueryData(['getNFT', id]);

  const isVideo = query?.media;

  const listPreviewTab = [
    {
      key: NFT_PROFILE_TABS.PREVIEW.key,
      tab: intl.formatMessage({ id: NFT_PROFILE_TABS.PREVIEW.label }),
      content: <PreviewImage src={query?.image?.url} preview={false} />,
    },
    {
      key: NFT_PROFILE_TABS.CONTENT.key,
      tab: intl.formatMessage({ id: NFT_PROFILE_TABS.CONTENT.label }),
      content: <PreviewContent type={query?.media?.type} src={query?.media?.url} />,
    },
  ];

  return (
    <div className={styleLess.nft_content}>
      <Card>
        <Row gutter={26}>
          <Col lg={10} md={12} xs={24} xl={isVideo ? 10 : 9} xxl={10}>
            {isVideo ? (
              <TabWapper
                tabPosition="left"
                indicator={{ size: (origin: any) => origin + 20, align: 'start' }}
                onChangeTab={handleChangeTab}
                activeKey={activeTab}
                listTab={listPreviewTab}
                className={styleLess.nft_content__tab}
              />
            ) : (
              <PreviewImage src={query?.image?.url} preview={false} />
            )}
          </Col>
          <Col lg={14} md={12} xs={24} xl={isVideo ? 14 : 15} xxl={14}>
            <Info />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NFTContent;
