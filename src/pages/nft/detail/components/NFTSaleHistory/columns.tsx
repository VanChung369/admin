import NumberWrapper from '@/components/NumberWrapper';
import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { formatCurrency, formatDate } from '@/utils/utils';
import { NFT_MARKET_CHANNEL } from '@/pages/nft/constants';
import EllipsisText from '@/components/EllipsisText';
import { EMPTY_DEFAULT_TEXT, NFT_USDC_DECIMAL_SCALE } from '@/constants/input';

export const columns = (intl: any, page: number, limit: number): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'NFT.detail.no' }),
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.sale.date' }),
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    width: 100,
    render: (_value: any, row: any) => formatDate(_value),
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.market.channel' }),
    dataIndex: 'saleOrder',
    key: 'saleOrder',
    sorter: true,
    width: 100,
    render: (value: any) => {
      const channel = NFT_MARKET_CHANNEL.find((item) => item.value === value?.type) as any;
      return <EllipsisText text={intl.formatMessage({ id: channel.name })} />;
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.quantity' }),
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    width: 100,
    ellipsis: true,
    render: (_value: any) => <NumberWrapper thousandSeparator value={_value} displayType="text" />,
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.pirce' }),
    dataIndex: 'saleOrder.unitPrice',
    key: 'saleOrder.unitPrice',
    sorter: true,
    width: 100,
    render: (_value: any, row: any) => {
      return (
        <NumberWrapper thousandSeparator value={row?.saleOrder?.unitPrice} displayType="text" />
      );
    },
  },

  {
    title: intl.formatMessage({ id: 'NFT.detail.history.subtotal' }),
    dataIndex: 'saleOrder',
    key: 'saleOrder',
    sorter: true,
    width: 100,
    render: (value: any, row: any) => {
      return (
        <NumberWrapper
          thousandSeparator
          value={formatCurrency(value?.unitPrice * row?.quantity, { isNotFormatDecimal: false })}
          displayType="text"
          decimalScale={NFT_USDC_DECIMAL_SCALE}
        />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.history.royalties' }),
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    width: 100,
    render: (_value: any, row: any) => {
      return row?.saleOrder?.type === NFT_MARKET_CHANNEL[2].value ? (
        <NumberWrapper
          thousandSeparator
          value={formatCurrency(row?.revenue, { isNotFormatDecimal: false })}
          displayType="text"
          decimalScale={NFT_USDC_DECIMAL_SCALE}
        />
      ) : (
        EMPTY_DEFAULT_TEXT
      );
    },
  },
];
