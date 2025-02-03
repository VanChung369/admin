import EllipsisText from '@/components/EllipsisText';
import ItemWithLabel from '@/components/ItemWithLabel';
import { NFT_DETAIL_ATTRIBUTE } from '@/pages/nft/constants';
import { getValueAttribute } from '@/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import { Col, Row } from 'antd';
import React from 'react';
import styleLess from './index.less';

const Attribute = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const renderAttributeItem = Object.keys(query?.attributes || {}).map(
    (attribute: any, index: number) => {
      const valueAttribute = getValueAttribute(query?.attributes, attribute);

      return (
        <Col lg={6} md={12} sm={12} key={index}>
          <ItemWithLabel
            label={attribute}
            className={styleLess.nft_detail_attribute__item}
            labelClassName={styleLess.nft_detail_attribute__label}
            contentClass={styleLess.nft_detail_attribute__content}
          >
            <EllipsisText text={valueAttribute} />
          </ItemWithLabel>
        </Col>
      );
    },
  );

  return <Row gutter={32}>{renderAttributeItem}</Row>;
};

export default Attribute;
