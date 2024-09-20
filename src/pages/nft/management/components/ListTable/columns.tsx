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

export const columns = (intl: any, page: number, limit: number): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'NFT.management.no' }),
    dataIndex: 'createdAt',
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.create.date' }),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    sorter: true,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.id' }),
    dataIndex: 'code',
    key: 'code',
    width: 75,
    sorter: true,
    render: (value: any) => formatText(value),
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.name' }),
    dataIndex: 'name',
    key: 'name',
    width: 125,
    sorter: true,
    ellipsis: true,
    render: (_value: any, row: any) => {
      return (
        <div className={styleLess.nft_name}>
          <ResponsiveImage src={row?.image?.smallUrl} />
          <EllipsisText text={row?.name} />
        </div>
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.supply' }),
    dataIndex: 'totalSupply',
    key: 'totalSupply',
    width: 100,
    sorter: true,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.minted' }),
    dataIndex: 'totalMinted',
    key: 'totalMinted',
    width: 100,
    sorter: true,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.quantity' }),
    dataIndex: 'onSaleQuantity',
    key: 'onSaleQuantity',
    width: 100,
    sorter: true,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.status' }),
    dataIndex: 'status',
    key: 'status',
    width: 75,
    render: (value: any) => {
      const curStatus = NFT_STATUS.find((status) => status?.value === value);
      return (
        <TagWrapper color={curStatus?.color} text={intl.formatMessage({ id: curStatus?.name })} />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.management.action' }),
    dataIndex: '_id',
    key: 'actions',
    width: 75,
    render: (value: any) => {
      return (
        <Link className={styleLess.nft_detail} to={`${ROUTES_PATH.NFT_DETAIL}/${value}`}>
          {intl.formatMessage({ id: 'NFT.management.detail' })}
        </Link>
      );
    },
  },
];
