import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import noop from 'lodash/noop';
import Item from './Item';
import { DASHBOARD_OVERVIEW, DASHBOARD_TIME_TYPES } from '../../constants';
import { DOLLAR_TEXT, TYPE_INPUT } from '@/constants/input';
import { useIntl } from '@umijs/max';
import { useGetConfig } from '@/hooks/hook-customs/useGetConfig';
import { useGetOverview } from '../../hooks';
import { getNumber } from '@/utils/utils';
import { Card } from 'antd';
import LoadingWrapper from '@/components/LoadingWrapper';
import FormWrapper from '@/components/FormWrapper';
import NumberFormatWrapper from '@/components/NumberFormatWrapper';
import { REVENUE_DECIMAL_SCALE } from '@/pages/Revenue/constants';
import ItemWithLabel from '@/components/ItemWithLabel';
import styleLess from './index.less';
import formatMessage from '@/components/FormatMessage';

const { TIME_TYPE } = DASHBOARD_OVERVIEW;
const { SELECT } = TYPE_INPUT;

const initialValues = {
  [TIME_TYPE]: DASHBOARD_TIME_TYPES[0].value,
};

const Overview = () => {
  const intl = useIntl();
  const [params, setParams] = useState(initialValues);
  const { currency = {} } = useGetConfig();
  const { data = {}, error, loading } = useGetOverview(params);

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E17' },
        type: 'error',
      });
    }
  }, [error]);

  const { sumUsdRevenue, sumRevenue, sumUsdVolume, sumVolume, soldNfts, users, nfts, newUsers } =
    data as any;

  const dashboardTimeTypeOptions = DASHBOARD_TIME_TYPES.map((dataType) => ({
    ...dataType,
    name: intl.formatMessage({ id: dataType?.name }),
  }));

  const handleFieldChange = (setFieldValue: any, field: string) => (val: any) => {
    setParams({
      ...params,
      [field]: val,
    });
    setFieldValue(field, val);
  };

  const saleOverview = [
    {
      title: intl.formatMessage({ id: 'dashboard.volume' }),
      helperText: intl.formatMessage({ id: 'dashboard.volume.tooltip' }),
      valueSymbol: getNumber(sumVolume),
      valueUsd: getNumber(sumUsdVolume),
    },
    {
      title: intl.formatMessage({ id: 'dashboard.revenue' }),
      helperText: intl.formatMessage({ id: 'dashboard.revenue.tooltip' }),
      valueSymbol: getNumber(sumRevenue),
      valueUsd: getNumber(sumUsdRevenue),
    },
  ];

  const infoOverview = [
    {
      title: intl.formatMessage({ id: 'dashboard.nfts' }),
      detail: [
        {
          label: intl.formatMessage({ id: 'dashboard.created.nfts' }),
          value: getNumber(nfts),
        },
        {
          label: intl.formatMessage({ id: 'dashboard.sold.nfts' }),
          value: getNumber(soldNfts),
        },
      ],
    },
    {
      title: intl.formatMessage({ id: 'dashboard.users' }),
      detail: [
        {
          label: intl.formatMessage({ id: 'dashboard.total.users' }),
          value: getNumber(users),
        },
        {
          label: intl.formatMessage({ id: 'dashboard.new.users' }),
          value: getNumber(newUsers),
        },
      ],
    },
  ];

  return (
    <Card>
      <Formik initialValues={initialValues} onSubmit={noop}>
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className={styleLess.overview}>
                <div className={styleLess.overview__search}>
                  <span className={styleLess.overview__search_title}>
                    {intl.formatMessage({ id: 'dashboard.overview' })}
                  </span>
                  <div className={styleLess.overview__search_filter}>
                    <FormWrapper
                      name={TIME_TYPE}
                      typeInput={SELECT}
                      options={dashboardTimeTypeOptions}
                      onChange={handleFieldChange(setFieldValue, TIME_TYPE)}
                    />
                  </div>
                </div>
              </div>

              <LoadingWrapper loading={loading}>
                {saleOverview.map((sale: any, index: number) => (
                  <Item title={sale?.title} helpText={sale?.helperText} key={index}>
                    <div className={styleLess.overview__content_single}>
                      <img
                        src={currency.icon}
                        className={styleLess.overview__content_single_icon}
                      />
                      <div className={styleLess.overview__content_single_currency}>
                        <div className={styleLess.overview__content_single_currency_symbol}>
                          <NumberFormatWrapper
                            value={sale?.valueSymbol}
                            displayType="text"
                            decimalScale={REVENUE_DECIMAL_SCALE}
                          />
                          &nbsp;
                          <span>{currency.symbol}</span>
                        </div>
                        <div className={styleLess.overview__content_currency_usd}>
                          ({DOLLAR_TEXT}&nbsp;
                          <NumberFormatWrapper
                            value={sale?.valueUsd}
                            displayType="text"
                            decimalScale={REVENUE_DECIMAL_SCALE}
                          />
                          )
                        </div>
                      </div>
                    </div>
                  </Item>
                ))}

                {infoOverview?.map((info, index) => (
                  <Item title={info?.title} key={index}>
                    <div className={styleLess.overview__content_multi}>
                      {info.detail.map((detail, index) => (
                        <ItemWithLabel
                          className={styleLess.overview__content_multi__text}
                          labelClassName={styleLess.overview__content_multi__label}
                          key={index}
                          label={detail?.label}
                        >
                          <NumberFormatWrapper
                            value={getNumber(detail?.value)}
                            displayType="text"
                          />
                        </ItemWithLabel>
                      ))}
                    </div>
                  </Item>
                ))}
              </LoadingWrapper>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default Overview;
