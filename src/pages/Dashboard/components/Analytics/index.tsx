import { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import noop from 'lodash/noop';
import { TYPE_INPUT } from '@/constants/input';
import {
  DASHBOARD_CURRENCY,
  DASHBOARD_DATA_TYPES,
  DASHBOARD_SALE_ANALYTICS,
  DASHBOARD_TIME_FORMAT,
  DASHBOARD_TIME_TYPES,
} from '../../constants';
import { useIntl } from '@umijs/max';
import { formatDate, getDuration } from '@/utils/utils';
import FormWrapper from '@/components/FormWrapper';
import LoadingWrapper from '@/components/LoadingWrapper';
import styleLess from './index.less';
import { useGetAnalytics } from '../../hooks';
import formatMessage from '@/components/FormatMessage';
import Chart from './Chart';
import { Card } from 'antd';

const { TIME_TYPE, DATA_TYPE, CURRENCY } = DASHBOARD_SALE_ANALYTICS;
const { SELECT } = TYPE_INPUT;
const { HOUR, MONTH_DAY, MONTH_YEAR, TOOLTIP, YEAR } = DASHBOARD_TIME_FORMAT;

const initialValues = {
  [CURRENCY]: DASHBOARD_CURRENCY[0].value,
  [DATA_TYPE]: DASHBOARD_DATA_TYPES[0].value,
  [TIME_TYPE]: DASHBOARD_TIME_TYPES[0].value,
};

const SaleAnalytics = () => {
  const intl = useIntl();
  const [params, setParams] = useState(initialValues);
  const { loading, error, saleAnalytics } = useGetAnalytics(params) as any;

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E15' },
        type: 'error',
      });
    }
  }, [error]);

  const { chartData, chartLabels } = useMemo(() => {
    if (!saleAnalytics?.length) {
      return {
        chartData: [],
        chartLabels: [],
      };
    }

    const labels = new Set<string>();
    const timeType = params[DASHBOARD_SALE_ANALYTICS.TIME_TYPE];
    const currency = params[DASHBOARD_SALE_ANALYTICS.CURRENCY];
    const dataType = params[DASHBOARD_SALE_ANALYTICS.DATA_TYPE];
    const from = moment(saleAnalytics[0]._id);
    const until = moment(saleAnalytics[saleAnalytics.length - 1]._id);
    const duration = getDuration(from, until);

    const data = saleAnalytics?.map((sale: any) => {
      const obj: any = {
        tooltip: formatDate(sale?._id, TOOLTIP),
      };

      switch (true) {
        case timeType === DASHBOARD_TIME_TYPES[1].value:
          obj.label = formatDate(sale?._id, HOUR) + 'h';
          break;
        case timeType === DASHBOARD_TIME_TYPES[2].value ||
          timeType === DASHBOARD_TIME_TYPES[3].value:
          obj.label = formatDate(sale?._id, MONTH_DAY);
          break;
        case timeType === DASHBOARD_TIME_TYPES[4].value ||
          timeType === DASHBOARD_TIME_TYPES[5].value:
          obj.label = formatDate(sale?._id, MONTH_YEAR);
          break;

        default:
          switch (true) {
            case duration.asHours() < 24:
              obj.label = formatDate(sale?._id, HOUR) + 'h';
              break;
            case duration.asMonths() <= 1:
              obj.label = formatDate(sale?._id, MONTH_DAY);
              break;
            case duration.asMonths() > 1 && duration.asMonths() <= 12:
              obj.label = formatDate(sale?._id, MONTH_YEAR);
              break;
            default:
              obj.label = formatDate(sale?._id, YEAR);
              break;
          }
          break;
      }

      labels.add(obj.label);

      const totalValue =
        dataType === DASHBOARD_DATA_TYPES[0].value ? sale?.totalVolume : sale?.totalRevenue;
      const totalValueUSD =
        dataType === DASHBOARD_DATA_TYPES[0].value ? sale?.totalVolumeUsd : sale?.totalRevenueUsd;

      obj.value =
        currency === DASHBOARD_CURRENCY[1].value
          ? (obj.value = totalValueUSD)
          : (obj.value = totalValue);

      return obj;
    });

    return {
      chartData: data,
      chartLabels: Array.from(labels),
    };
  }, [params, saleAnalytics]);

  const dashboardDataTypeOptions = useMemo(
    () =>
      DASHBOARD_DATA_TYPES.map((dataType) => ({
        ...dataType,
        name: intl.formatMessage({ id: dataType?.name }),
      })),
    [intl],
  );

  const dashboardTimeTypeOptions = useMemo(
    () =>
      DASHBOARD_TIME_TYPES.map((dataType) => ({
        ...dataType,
        name: intl.formatMessage({ id: dataType?.name }),
      })),
    [intl],
  );

  const handleFieldChange = useCallback(
    (setFieldValue: any, field: string) => (val: any) => {
      setFieldValue(field, val);
      setParams((prevParams) => ({
        ...prevParams,
        [field]: val,
      }));
    },
    [],
  );

  return (
    <Card>
      <div className={styleLess.analytics}>
        <Formik initialValues={initialValues} onSubmit={noop}>
          {({ setFieldValue }) => {
            return (
              <Form>
                <div className={styleLess.analytics__search}>
                  <span className={styleLess.analytics__search_title}>
                    {intl.formatMessage({ id: 'dashboard.sale.analytics' })}
                  </span>
                  <div className={styleLess.analytics__search_filter}>
                    <FormWrapper
                      name={CURRENCY}
                      typeInput={SELECT}
                      options={DASHBOARD_CURRENCY}
                      onChange={handleFieldChange(setFieldValue, CURRENCY)}
                    />
                    <FormWrapper
                      name={DATA_TYPE}
                      typeInput={SELECT}
                      options={dashboardDataTypeOptions}
                      onChange={handleFieldChange(setFieldValue, DATA_TYPE)}
                    />
                    <FormWrapper
                      name={TIME_TYPE}
                      typeInput={SELECT}
                      options={dashboardTimeTypeOptions}
                      onChange={handleFieldChange(setFieldValue, TIME_TYPE)}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <LoadingWrapper loading={loading}>
          <Chart data={chartData} labels={chartLabels} />
        </LoadingWrapper>
      </div>
    </Card>
  );
};

export default SaleAnalytics;
