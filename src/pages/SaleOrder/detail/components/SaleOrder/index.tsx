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
  const query: any = queryClient.getQueryData(['getSaleOrder', id]);

  const nftStandard = NFT_STANDARD.find((standard) => standard?.value === query?.nft?.token)?.label;
  const sale = columns(intl, query, nftStandard);

  return (
    <Row gutter={32} className={styleLess.sale_detail}>
      {sale.map((sale, index: number) => {
        return (
          <Col lg={4} md={12} sm={12} key={index}>
            <ItemWithLabel
              label={sale.label}
              className={styleLess.sale_detail__item}
              labelClassName={styleLess.sale_detail__label}
              contentClass={styleLess.sale_detail__content}
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
