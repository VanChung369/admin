import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import ListTable from '../ListTable';
import TypographyWrapper from '@/components/TypographyWrapper';
import NumberWrapper from '@/components/NumberWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import { Col, Row } from 'antd';
import SearchSaleOrder from '../Search';
import styleLess from './index.less';
import { useGetListCollections } from '@/pages/Collection/hooks';

type tagProps = {
  params: any;
  onSubmit: (values: any) => void;
};

const TagList = ({ params, onSubmit }: tagProps) => {
  const intl = useIntl();
  const { data, loading } = useGetListCollections(params);

  return (
    <Fragment>
      <Row align={'middle'}>
        <Col span={24}>
          <SearchSaleOrder onSubmit={onSubmit} params={params} />
        </Col>
      </Row>
      <TypographyWrapper
        className={styleLess.collection_total}
        typeTypography={TYPE_TYPOGRAPHY.TEXT_HELP}
        label={intl.formatMessage({ id: 'collection.management.total' })}
      >
        <NumberWrapper thousandSeparator value={data?.totalDocs} displayType="text" />
      </TypographyWrapper>
      <ListTable
        total={data?.totalDocs}
        loading={loading}
        data={data?.docs}
        onSetParams={onSubmit}
        params={params}
        emtpyText={intl.formatMessage({ id: 'common.text.no.data' })}
      />
    </Fragment>
  );
};

export default TagList;
