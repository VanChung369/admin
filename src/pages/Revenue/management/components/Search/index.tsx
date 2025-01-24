import { SearchProps } from '../../typings';
import { useIntl } from '@umijs/max';
import { memo, useRef } from 'react';
import { LENGTH_CONSTANTS, ORDERS } from '@/constants';
import { isString, omitBy, trim } from 'lodash';
import { useChangeAddress } from '@/hooks/hook-customs/useChangeAddress';
import { Formik } from 'formik';
import { Col, Form, Row } from 'antd';
import styleLess from './index.less';
import { TYPE_INPUT } from '@/constants/input';
import FormWrapper from '@/components/FormWrapper';
import { ReloadOutlined } from '@ant-design/icons';
import { REVENUE_MANAGEMENT_FIELD, REVENUE_TYPE } from '@/pages/Revenue/constants';
import { disabledFromDate, disabledUntilDate } from '@/utils/utils';

const { PAGE, KEYWORD, FROM, UNTIL, STANDARD } = REVENUE_MANAGEMENT_FIELD;
const { DEFAULT_PAGE } = LENGTH_CONSTANTS;
const { FIELD, ORDER } = ORDERS;

const initialValues = {
  [KEYWORD]: '',
  [FROM]: null,
  [UNTIL]: null,
};

const SearchRevenue = ({ onSubmit, params }: SearchProps) => {
  const intl = useIntl();
  const formRef = useRef<any>(null);

  const handleChangeField =
    (setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void, field: string) =>
    (value: string) => {
      setFieldValue(field, isString(value) ? trim(value) : value);
      onSubmit({
        ...params,
        [field]: isString(value) ? trim(value) : value,
        [PAGE]: DEFAULT_PAGE,
      });
    };

  const handleResetForm = () => {
    formRef?.current?.resetForm();
    onSubmit({
      ...omitBy(params, [FIELD, ORDER]),
      ...initialValues,
      [PAGE]: DEFAULT_PAGE,
    });
  };

  useChangeAddress({ callback: handleResetForm });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} innerRef={formRef}>
      {({ setFieldValue, values }) => (
        <Form className={styleLess.nft_search}>
          <Row gutter={20} className={styleLess.nft_search__row} align="middle">
            <Col lg={11} sm={12} xs={24}>
              <FormWrapper
                name={KEYWORD}
                placeholder={intl.formatMessage({ id: 'revenue.management.search.placeholder' })}
                onSearch={handleChangeField(setFieldValue, KEYWORD)}
                typeInput={TYPE_INPUT.SEARCH_DEBOUNCE}
              />
            </Col>
            <Col lg={4} sm={12} xs={24} className="col-date">
              <FormWrapper
                name={FROM}
                placeholder={intl.formatMessage({ id: 'revenue.management.start.date' })}
                onChange={handleChangeField(setFieldValue, FROM)}
                disabledDate={disabledFromDate(values?.[UNTIL])}
                typeInput={TYPE_INPUT.DATE}
              />
            </Col>
            <Col lg={4} sm={12} xs={24}>
              <FormWrapper
                name={UNTIL}
                placeholder={intl.formatMessage({ id: 'revenue.management.end.date' })}
                onChange={handleChangeField(setFieldValue, UNTIL)}
                disabledDate={disabledUntilDate(values?.[FROM])}
                typeInput={TYPE_INPUT.DATE}
              />
            </Col>
            <Col lg={5} sm={24} xs={24}>
              <ReloadOutlined
                onClick={handleResetForm}
                className={styleLess.revenue_search__row__reset}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default memo(SearchRevenue);
