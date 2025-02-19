import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import ListTable from '../ListTable';
import TypographyWrapper from '@/components/TypographyWrapper';
import NumberWrapper from '@/components/NumberWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import SearchNfts from '../Search';
import { Col, Row } from 'antd';
import SettingColums from '../SettingColumns';
import { useGetListRevenues } from '@/pages/Revenue/hooks';
import { formatCurrency, getNumber } from '@/utils/utils';
import { CURRENCY } from '@/pages/Revenue/constants';
import CoinIcon from '@/resources/images/coin_icon.png';
import Sale from '../Sale';

type ResellProps = {
  values: any;
  onSubmit: (values: any) => void;
  getListColumn: (value: any) => any;
  listColumn: Array<any>;
  columnsItem: Array<any>;
};

const Resell = ({ values, onSubmit, getListColumn, listColumn, columnsItem }: ResellProps) => {
  const intl = useIntl();
  const { params } = values;
  const { data, loading } = useGetListRevenues(params);
  const secondarySaleItem = [
    {
      label: 'revenue.management.secondary.sales.revenue',
      value: formatCurrency(getNumber(data?.summary?.revenue?.secondarySale), {
        isNotCompare: true,
      }),
      toolTip: intl.formatMessage({ id: 'revenue.management.secondary.revenue.tooltip' }),
      appIcon: CoinIcon,
      currency: CURRENCY,
      usd: getNumber(data?.summary?.revenue?.secondarySaleUsd),
    },
    {
      label: 'revenue.management.secondary.sales.volume',
      value: formatCurrency(getNumber(data?.summary?.volume?.secondarySale), {
        isNotCompare: true,
      }),
      toolTip: intl.formatMessage({ id: 'revenue.management.secondary.volume.tooltip' }),
      appIcon: CoinIcon,
      currency: CURRENCY,
      usd: getNumber(data?.summary?.volume?.secondarySaleUsd),
    },
    {
      label: 'revenue.management.secondary.transactions',
      value: data?.totalDocs,
    },
    {
      label: 'revenue.management.secondary.nfts.sold',
      value: getNumber(data?.summary?.nftSold),
    },
  ];

  return (
    <Fragment>
      <Row align={'middle'}>
        <Col span={23}>
          <SearchNfts onSubmit={onSubmit} params={params} />
        </Col>
        <Col span={1} offset={0}>
          <SettingColums
            getListColumn={getListColumn}
            listColumn={listColumn}
            columnsItem={columnsItem}
          />
        </Col>
      </Row>
      <Sale saleItem={secondarySaleItem} />
      <ListTable
        total={data?.totalDocs}
        listColumn={listColumn}
        loading={loading}
        data={data?.docs}
        onSetParams={onSubmit}
        params={params}
        emtpyText={intl.formatMessage({ id: 'common.text.no.data' })}
      />
    </Fragment>
  );
};

export default Resell;
