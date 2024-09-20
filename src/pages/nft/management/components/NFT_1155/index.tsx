import { useGetListNFTs } from '@/pages/nft/hooks';
import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import ListTable from '../ListTable';
import TypographyWrapper from '@/components/TypographyWrapper';
import NumberWrapper from '@/components/NumberWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';
import SearchNfts from '../Search';
import { Col, Row } from 'antd';
import SettingColums from '../SettingColumns';

type NFT_1155Props = {
  values: any;
  onSubmit: (values: any) => void;
  getListColumn: (value: any) => any;
  listColumn: Array<any>;
  columnsItem: Array<any>;
};

const NFT_1155 = ({ values, onSubmit, getListColumn, listColumn, columnsItem }: NFT_1155Props) => {
  const intl = useIntl();
  const { params } = values;
  const { data, loading } = useGetListNFTs(params);

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
      <TypographyWrapper
        typeTypography={TYPE_TYPOGRAPHY.TEXT_HELP}
        label={intl.formatMessage({ id: 'NFT.management.Total' })}
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

export default NFT_1155;
