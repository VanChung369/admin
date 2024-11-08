import EllipsisText from '@/components/EllipsisText';
import NumberWrapper from '@/components/NumberWrapper';
import ResponsiveImage from '@/components/ResponsiveImage';
import { NFT_STATUS } from '@/pages/nft/constants';
import { formatDate, formatText } from '@/utils/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES_PATH from '@/constants/routesPath';
import type { ProColumns } from '@ant-design/pro-components';
import styleLess from './index.less';
import TagWrapper from '@/components/TagWrapper';
import ShortenAddress from '@/components/ShortenAddress';
import { SALE_ORDER_METHOD, SALE_ORDER_STATUS } from '@/pages/SaleOrder/constants';

export const columns = (intl: any, page: number, limit: number): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'sale.order.management.no' }),
    dataIndex: 'createdAt',
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.created.by' }),
    dataIndex: 'fromAddress',
    key: 'fromAddress',
    width: 100,
    render: (value: any) => <ShortenAddress address={value} isCopy={true} />,
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.quantity' }),
    dataIndex: 'quantity',
    key: 'quantity',
    width: 75,
    sorter: true,
    render: (value: any) => <NumberWrapper thousandSeparator value={value} displayType="text" />,
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.sold' }),
    dataIndex: 'sold',
    key: 'sold',
    width: 75,
    sorter: true,
    ellipsis: true,
    render: (value: any) => <NumberWrapper thousandSeparator value={value} displayType="text" />,
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.remain' }),
    dataIndex: 'remain',
    key: 'remain',
    width: 75,
    sorter: true,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.unit.price' }),
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 75,
    sorter: true,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.start.date' }),
    dataIndex: 'startDate',
    key: 'startDate',
    width: 100,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.end.date' }),
    dataIndex: 'endDate',
    key: 'endDate',
    width: 100,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.created.at' }),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    sorter: true,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.method' }),
    dataIndex: 'method',
    key: 'method',
    width: 75,
    render: (value: any) => {
      const curMethod = SALE_ORDER_METHOD.find((method) => method?.value === value);
      return (
        <TagWrapper color={curMethod?.color} text={intl.formatMessage({ id: curMethod?.name })} />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.status' }),
    dataIndex: 'status',
    key: 'status',
    width: 75,
    render: (value: any) => {
      const curStatus = SALE_ORDER_STATUS.find((status) => status?.value === value);
      return (
        <TagWrapper color={curStatus?.color} text={intl.formatMessage({ id: curStatus?.name })} />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'sale.order.management.actions' }),
    dataIndex: '_id',
    key: 'actions',
    width: 75,
    render: (value: any) => {
      return (
        <Link className={styleLess.sale_order_detail} to={`${ROUTES_PATH.SALE_DETAIL}/${value}`}>
          {intl.formatMessage({ id: 'sale.order.detail' })}
        </Link>
      );
    },
  },
];
