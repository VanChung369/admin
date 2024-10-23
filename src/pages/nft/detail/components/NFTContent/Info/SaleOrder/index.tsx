import { Col, Row } from 'antd';
import React from 'react';
import { columns } from './columns';
import { useIntl, useParams } from '@umijs/max';
import { useQueryClient } from '@tanstack/react-query';
import { EMPTY_DEFAULT_TEXT, TYPE_INPUT } from '@/constants/input';
import NumberWrapper from '@/components/NumberWrapper';
import ItemWithLabel from '@/components/ItemWithLabel';
import { isNil } from 'lodash';
import styleLess from './index.less';
import { NFT_STANDARD } from '@/pages/nft/constants';

const SaleOrder = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const nftStandard = NFT_STANDARD.find(
    (standard) => standard?.value === query?.token?.standard,
  )?.label;
  const sale = columns(intl, query, nftStandard);

  return (
    <Row gutter={32} className={styleLess.nft_detail_sale}>
      {sale.map((sale, index: number) => {
        return (
          <Col lg={6} md={12} sm={12} key={index}>
            <ItemWithLabel
              label={sale.label}
              className={styleLess.nft_detail_sale__item}
              labelClassName={styleLess.nft_detail_sale__label}
              contentClass={styleLess.nft_detail_sale__content}
              helpText={sale.helpText}
            >
              {sale?.type === TYPE_INPUT.NUMBER ? (
                !isNil(sale?.value) ? (
                  <>
                    <NumberWrapper thousandSeparator value={sale?.value} displayType="text" />
                    &nbsp;
                    {sale?.prefix}
                  </>
                ) : (
                  EMPTY_DEFAULT_TEXT
                )
              ) : (
                sale?.value
              )}
            </ItemWithLabel>
          </Col>
        );
      })}
    </Row>
  );
};

export default SaleOrder;
