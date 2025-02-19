import EllipsisText from '@/components/EllipsisText';
import ResponsiveImage from '@/components/ResponsiveImage';
import TableWrapper from '@/components/TableWrapper';
import { ZERO_VALUE } from '@/constants/input';
import { Link, useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import styleLess from './index.less';
import NumberWrapper from '@/components/NumberWrapper';
import ROUTES_PATH from '@/constants/routesPath';
import { useGetTopNFTs } from '@/pages/Dashboard/hooks';
import { NFT_STANDARD } from '@/pages/nft/constants';
import { DASHBOARD_TOP_NFTS_SORT } from '@/pages/Dashboard/constants';

const { TOTAL_VOLUME, DESC } = DASHBOARD_TOP_NFTS_SORT;
const NFT_1155 = () => {
  const intl = useIntl();
  const { data, loading } = useGetTopNFTs({
    tokenStandard: NFT_STANDARD[1].value,
    [TOTAL_VOLUME]: DESC,
  });

  const columns = [
    {
      title: intl.formatMessage({ id: 'dashboard.no' }),
      width: 20,
      render: (_value: any, _row: any, index: number) => index + 1,
    },
    {
      title: intl.formatMessage({ id: 'dashboard.nft.name' }),
      width: 65,
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
      render: (_value: string, row: any) => {
        return (
          <div className={styleLess.nft_name}>
            <ResponsiveImage src={row?._id?.image?.url} />
            <EllipsisText text={row?._id?.name} />
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.volume' }),
      width: 40,
      dataIndex: 'nft',
      key: 'nft',
      render: (_value: any, row: any) => {
        return <NumberWrapper thousandSeparator value={row?.totalVolume} displayType="text" />;
      },
    },
    {
      title: intl.formatMessage({ id: 'dashboard.sub.action' }),
      width: 40,
      dataIndex: 'hash',
      key: 'hash',
      render: (_value: any, row: any) => {
        return (
          <Link className={styleLess.nft_detail} to={`${ROUTES_PATH.NFT_DETAIL}/${row?.nft?.id}`}>
            {intl.formatMessage({ id: 'dashboard.management.detail' })}
          </Link>
        );
      },
    },
  ];

  return (
    <Fragment>
      <TableWrapper
        total={ZERO_VALUE}
        columns={columns}
        loading={loading}
        dataSource={data?.docs}
        scroll={{ x: 390 }}
        isPagination={false}
        emptyText={intl.formatMessage({ id: 'common.text.no.data' })}
        rowKey={(row: any) => row?._id?.id}
      />
    </Fragment>
  );
};

export default NFT_1155;
