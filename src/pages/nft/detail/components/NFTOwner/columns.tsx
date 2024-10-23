import NumberWrapper from '@/components/NumberWrapper';
import React from 'react';
import { EXTERNAL_URL } from '@/constants/routesPath';
import type { ProColumns } from '@ant-design/pro-components';
import ShortenAddress from '@/components/ShortenAddress';

export const columns = (
  intl: any,
  page: number,
  limit: number,
  contractAddress?: string,
): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'NFT.detail.no' }),
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.current.owner' }),
    dataIndex: 'address',
    key: 'address',
    width: 100,
    render: (_value: any, row: any) => (
      <ShortenAddress
        address={_value}
        admin={row?.isAddressAdmin && intl.formatMessage({ id: 'NFT.admin' })}
      />
    ),
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.token.id' }),
    dataIndex: 'tokenId',
    key: 'tokenId',
    width: 75,
    render: (value: any) => <ShortenAddress address={`#${value}`} />,
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.minted.by' }),
    dataIndex: 'mintedBy',
    key: 'mintedBy',
    width: 125,
    ellipsis: true,
    render: (_value: any, row: any) => {
      return (
        <ShortenAddress
          address={_value}
          admin={row?.isMintedByAdmin && intl.formatMessage({ id: 'NFT.admin' })}
        />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.quantity' }),
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
    render: (value: any) => {
      return <NumberWrapper thousandSeparator value={value} displayType="text" />;
    },
  },
  {
    title: intl.formatMessage({ id: 'NFT.detail.actions' }),
    dataIndex: 'address',
    key: 'address',
    width: 75,
    render: (value: any, row: any) => {
      return (
        <a
          href={`${EXTERNAL_URL.POLYGON_SCAN_TOKEN}/${contractAddress}/${row.tokenId}`}
          target="_blank"
          rel="noreferrer"
        >
          {intl.formatMessage({ id: 'NFT.detail.view.ploygon' })}
        </a>
      );
    },
  },
];
