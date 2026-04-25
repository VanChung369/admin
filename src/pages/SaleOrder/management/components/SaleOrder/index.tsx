import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import ListTable from '../ListTable';
import TypographyWrapper from '@/components/TypographyWrapper';
import NumberWrapper from '@/components/NumberWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import SettingColums from '../SettingColumns';
import { Col, Row } from 'antd';
import { useGetListSaleOrder } from '@/pages/SaleOrder/hooks';
import SearchSaleOrder from '../Search';
import styleLess from './index.less';

type saleOrderProps = {
  params: any;
  getListColumn: (value: any) => any;
  listColumn: Array<any>;
  columnsItem: Array<any>;
  onSubmit: (values: any) => void;
};

const SaleOrder = ({
  params,
  onSubmit,
  getListColumn,
  listColumn,
  columnsItem,
}: saleOrderProps) => {
  const intl = useIntl();
  const { data, loading } = useGetListSaleOrder(params);

  return (
    <Fragment>
      <Row align={'middle'}>
        <Col span={23}>
          <SearchSaleOrder onSubmit={onSubmit} params={params} />
        </Col>
        <Col span={1} offset={0}>
          <SettingColums
            getListColumn={getListColumn}
            listColumn={listColumn}
            columnsItem={columnsItem}
          />
        </Col>
      </Row>
      <TypographyWrapper
        className={styleLess.sale_order_total}
        typeTypography={TYPE_TYPOGRAPHY.TEXT_HELP}
        label={intl.formatMessage({ id: 'sale.order.management.total' })}
      >
        <NumberWrapper thousandSeparator value={data?.totalDocs} displayType="text" />
      </TypographyWrapper>
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

export default SaleOrder;
