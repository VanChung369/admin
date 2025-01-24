import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import ListTable from '../ListTable';
import TypographyWrapper from '@/components/TypographyWrapper';
import NumberWrapper from '@/components/NumberWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import SearchNfts from '../Search';
import SettingColums from '../SettingColumns';
import { Col, Row } from 'antd';
import { useGetListRevenues } from '@/pages/Revenue/hooks';
import { formatCurrency, formatNumberWithSuffix, getNumber } from '@/utils/utils';
import CoinIcon from '@/resources/images/coin_icon.png';
import { CURRENCY } from '@/pages/Revenue/constants';
import Sale from '../Sale';

type SellProps = {
  values: any;
  getListColumn: (value: any) => any;
  listColumn: Array<any>;
  columnsItem: Array<any>;
  onSubmit: (values: any) => void;
};

const Sell = ({ values, onSubmit, getListColumn, listColumn, columnsItem }: SellProps) => {
  const intl = useIntl();
  const { params } = values;
  const { data, loading } = useGetListRevenues(params);
  const primarySaleItem = [
    {
      label: 'revenue.management.primary.sale.revenue',
      value: formatCurrency(getNumber(data?.revenue?.primarySale), { isNotCompare: true }),
      toolTip: intl.formatMessage({ id: 'revenue.management.primary.revenue.tooltip' }),
      appIcon: CoinIcon,
      currency: CURRENCY,
      usd: getNumber(data?.revenue?.primarySaleUsd),
    },
    {
      label: 'revenue.management.primary.sale.volume',
      value: formatCurrency(getNumber(data?.volume?.primarySale), { isNotCompare: true }),
      toolTip: intl.formatMessage({ id: 'revenue.management.primary.volume.tooltip' }),
      appIcon: CoinIcon,
      currency: CURRENCY,
      usd: getNumber(data?.volume?.primarySaleUsd),
    },
    {
      label: 'revenue.management.primary.transactions',
      value: formatNumberWithSuffix(data?.totalDocs),
    },
    {
      label: 'revenue.management.primary.nfts.sold',
      value: formatNumberWithSuffix(getNumber(data?.nftSold)),
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
      <Sale saleItem={primarySaleItem} />
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

export default Sell;
