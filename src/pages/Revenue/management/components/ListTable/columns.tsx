import EllipsisText from '@/components/EllipsisText';
import NumberWrapper from '@/components/NumberWrapper';
import ResponsiveImage from '@/components/ResponsiveImage';
import { formatCurrency, formatDate, formatText } from '@/utils/utils';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ROUTES_PATH from '@/constants/routesPath';
import type { ProColumns } from '@ant-design/pro-components';
import styleLess from './index.less';
import { REVENUE_TYPE } from '@/pages/Revenue/constants';
import ShortenAddress from '@/components/ShortenAddress';
import NumberFormatWrapper from '@/components/NumberFormatWrapper';
import { NFT_USDC_DECIMAL_SCALE } from '@/constants/input';
import RevenueDetail from '@/pages/Revenue/detail';

export const columns = (intl: any, page: number, limit: number): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'revenue.management.no' }),
    dataIndex: 'createdAt',
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.sale.date' }),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    sorter: true,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.type' }),
    dataIndex: 'nft.token.standard',
    key: 'nft.token.standard',
    width: 50,
    render: (_value: any, row: any) => {
      const type = REVENUE_TYPE.find((item) => item?.value === row?.nft?.token?.standard) as any;
      return <EllipsisText text={intl.formatMessage({ id: type?.name })} />;
    },
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.nft.id' }),
    dataIndex: 'nft.id',
    key: 'nft.id',
    width: 50,
    sorter: true,
    render: (_value: any, row: any) => formatText(row?.nft?.code),
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.name' }),
    dataIndex: 'nft.name',
    key: 'nft.name',
    width: 100,
    sorter: true,
    ellipsis: true,
    render: (_value: any, row: any) => {
      return (
        <div className={styleLess.nft_name}>
          <ResponsiveImage src={row?.nft?.image?.smallUrl} />
          <EllipsisText text={row?.nft?.name} />
        </div>
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.seller' }),
    width: 75,
    dataIndex: 'fromAddress',
    key: 'fromAddress',
    render: (value: any) => <ShortenAddress address={value} isCopy={true} />,
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.buyer' }),
    width: 75,
    dataIndex: 'toAddress',
    key: 'toAddress',
    render: (value: any) => <ShortenAddress address={value} isCopy={true} />,
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.token.id' }),
    dataIndex: 'saleOrder.tokenId',
    key: 'saleOrder.tokenId',
    width: 50,
    render: (value: any) => <ShortenAddress address={`#${value}`} />,
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.quantity' }),
    width: 50,
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    render: (value: any) => <NumberWrapper thousandSeparator value={value} displayType="text" />,
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.royalties' }),
    width: 50,
    dataIndex: 'saleOrder.unitPrice',
    key: 'saleOrder.unitPrice',
    sorter: true,
    render: (_value: any, row: any) =>
      formatCurrency(row?.saleOrder?.unitPrice, { isNotCompare: true }),
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.quantity' }),
    width: 50,
    dataIndex: 'subTotal',
    key: 'subTotal',
    sorter: true,
    render: (value: any) => (
      <NumberFormatWrapper value={value} decimalScale={NFT_USDC_DECIMAL_SCALE} isNotFormatDecimal />
    ),
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.quantity' }),
    width: 50,
    dataIndex: 'revenue',
    key: 'revenue',
    sorter: true,
    render: (value: any) => (
      <NumberFormatWrapper value={value} decimalScale={NFT_USDC_DECIMAL_SCALE} isNotFormatDecimal />
    ),
  },
  {
    title: intl.formatMessage({ id: 'revenue.management.actions' }),
    dataIndex: '_id',
    key: 'actions',
    width: 75,
    render: (value: any) => {
      return (
        <Fragment>
          <RevenueDetail revenueId={value} />
        </Fragment>
      );
    },
  },
];
