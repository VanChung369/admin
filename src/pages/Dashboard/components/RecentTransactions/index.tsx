import EllipsisText from '@/components/EllipsisText';
import NumberWrapper from '@/components/NumberWrapper';
import ResponsiveImage from '@/components/ResponsiveImage';
import { ZERO_VALUE } from '@/constants/input';
import { useGetConfig } from '@/hooks/hook-customs/useGetConfig';
import { Link, useIntl } from '@umijs/max';
import styleLess from './index.less';
import ROUTES_PATH from '@/constants/routesPath';
import { useGetTransactions } from '../../hooks';
import { Card } from 'antd';
import LoadingWrapper from '@/components/LoadingWrapper';
import TableWrapper from '@/components/TableWrapper';
import formatMessage from '@/components/FormatMessage';
import { useEffect } from 'react';

const RecentTransaction = () => {
  const intl = useIntl();
  const { currency } = useGetConfig();
  const { data, loading, error } = useGetTransactions();

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E16' },
        type: 'error',
      });
    }
  }, [error]);

  const columns = [
    {
      title: intl.formatMessage({ id: 'dashboard.no' }),
      width: 20,
      render: (_value: any, _row: any, index: number) => index + 1,
    },
    {
      title: intl.formatMessage({ id: 'dashboard.nft.name' }),
      width: 65,
      dataIndex: 'nft.imgUrl',
      key: 'nft.imgUrl',
      ellipsis: true,
      render: (_value: string, row: any) => {
        return (
          <div className={styleLess.transaction__nft_name}>
            <ResponsiveImage src={row?.nft?.image?.smallUrl} />
            <EllipsisText text={row?.nft?.name} />
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.quantity' }),
      width: 40,
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value: any) => {
        return <NumberWrapper thousandSeparator value={value} displayType="text" />;
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.price' }),
      width: 35,
      dataIndex: 'saleOrder',
      key: 'saleOrder',
      render: (_value: any, row: any) => {
        return (
          <NumberWrapper
            displayType="text"
            thousandSeparator
            value={row?.saleOrder?.unitPrice}
            suffix={currency?.symbol}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.sub.total' }),
      width: 40,
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (value: any) => {
        return (
          <NumberWrapper
            displayType="text"
            thousandSeparator
            value={value}
            suffix={currency?.symbol}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.sub.action' }),
      width: 40,
      dataIndex: 'hash',
      key: 'hash',
      render: (_value: any, row: any) => {
        return (
          <Link
            className={styleLess.transaction__nft_detail}
            to={`${ROUTES_PATH.NFT_DETAIL}/${row?.nft?.id}`}
          >
            {intl.formatMessage({ id: 'dashboard.management.detail' })}
          </Link>
        );
      },
    },
  ];

  return (
    <Card className={styleLess.transaction}>
      <div className={styleLess.transaction__title}>
        {intl.formatMessage({ id: 'dashboard.recent.transactions' })}
      </div>

      <LoadingWrapper loading={loading}>
        <TableWrapper
          total={ZERO_VALUE}
          columns={columns}
          loading={loading}
          dataSource={data?.docs}
          scroll={{ x: 606 }}
          isPagination={false}
          emptyText={intl.formatMessage({ id: 'common.text.no.data' })}
          rowKey={(row: any) => row?._id}
        />
      </LoadingWrapper>
    </Card>
  );
};

export default RecentTransaction;
