import EllipsisText from '@/components/EllipsisText';
import NumberWrapper from '@/components/NumberWrapper';
import { formatDate, formatText } from '@/utils/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES_PATH from '@/constants/routesPath';
import type { ProColumns } from '@ant-design/pro-components';
import TagWrapper from '@/components/TagWrapper';
import ShortenAddress from '@/components/ShortenAddress';
import { COLLECTION_STANDARD, COLLECTION_STATUS } from '@/pages/Collection/constants';
import CollectionCreateOrUpdate from '@/pages/Collection/creation';

export const columns = (intl: any, page: number, limit: number): ProColumns<any>[] => [
  {
    title: intl.formatMessage({ id: 'collection.management.no' }),
    dataIndex: 'createdAt',
    key: 'no',
    width: 50,
    render: (_value: any, _row: any, index: number) => (page - 1) * limit + index + 1,
  },
  {
    title: intl.formatMessage({ id: 'collection.management.name' }),
    dataIndex: 'name',
    key: 'name',
    width: 50,
    ellipsis: true,
    render: (_value: any, row: any) => {
      return <EllipsisText text={_value} />;
    },
  },
  {
    title: intl.formatMessage({ id: 'collection.management.created.by' }),
    dataIndex: 'creatorAddress',
    key: 'creatorAddress',
    width: 100,
    render: (value: any) => <ShortenAddress address={value} isCopy={true} />,
  },
  {
    title: intl.formatMessage({ id: 'collection.management.item.quantity' }),
    dataIndex: 'itemQuantity',
    key: 'itemQuantity',
    width: 75,
    sorter: true,
    render: (value: any) => <NumberWrapper thousandSeparator value={value} displayType="text" />,
  },
  {
    title: intl.formatMessage({ id: 'collection.management.standard' }),
    dataIndex: 'standard',
    key: 'standard',
    width: 50,
    render: (value: any) => {
      const curMethod = COLLECTION_STANDARD.find((status) => status?.value === value);
      return <EllipsisText text={intl.formatMessage({ id: curMethod?.name })} />;
    },
  },
  {
    title: intl.formatMessage({ id: 'collection.management.status' }),
    dataIndex: 'status',
    key: 'status',
    width: 50,
    render: (value: any) => {
      const curMethod = COLLECTION_STATUS.find((status) => status?.value === value);
      return (
        <TagWrapper color={curMethod?.color} text={intl.formatMessage({ id: curMethod?.name })} />
      );
    },
  },
  {
    title: intl.formatMessage({ id: 'collection.management.created.at' }),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 100,
    sorter: true,
    render: (value: any) => formatDate(value),
  },
  {
    title: intl.formatMessage({ id: 'collection.management.actions' }),
    dataIndex: '_id',
    key: 'actions',
    width: 50,
    render: (value: any) => {
      return <CollectionCreateOrUpdate collectionId={value} />;
    },
  },
];
