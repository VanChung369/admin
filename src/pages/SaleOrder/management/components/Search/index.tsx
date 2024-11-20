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
import {
  SALE_ORDER_MANAGEMENT_FIELD,
  SALE_ORDER_METHOD,
  SALE_ORDER_STATUS,
} from '@/pages/SaleOrder/constants';

const { KEYWORD, STATUS, METHOD, PAGE } = SALE_ORDER_MANAGEMENT_FIELD;
const { DEFAULT_PAGE } = LENGTH_CONSTANTS;
const { FIELD, ORDER } = ORDERS;

const initialValues = {
  [KEYWORD]: '',
  [STATUS]: null,
  [METHOD]: null,
};

const SearchSaleOrder = ({ onSubmit, params }: SearchProps) => {
  const intl = useIntl();
  const formRef = useRef<any>(null);
  const formatStatusOptions = SALE_ORDER_STATUS.map((status) => ({
    ...status,
    name: intl.formatMessage({ id: status.name }),
  }));

  const formatMethodOptions = SALE_ORDER_METHOD.map((method) => ({
    ...method,
    name: intl.formatMessage({ id: method.name }),
  }));

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
      {({ setFieldValue }) => (
        <Form className={styleLess.nft_search}>
          <Row gutter={20} className={styleLess.nft_search__row} align="middle">
            <Col lg={8} sm={12} xs={24}>
              <FormWrapper
                name={KEYWORD}
                placeholder={intl.formatMessage({ id: 'sale.order.management.search.placeholder' })}
                onSearch={handleChangeField(setFieldValue, KEYWORD)}
                typeInput={TYPE_INPUT.SEARCH_DEBOUNCE}
                autoComplete="off"
              />
            </Col>
            <Col lg={3} sm={12} xs={24}>
              <FormWrapper
                placeholder={intl.formatMessage({ id: 'sale.order.management.status' })}
                options={formatStatusOptions}
                name={STATUS}
                onChange={handleChangeField(setFieldValue, STATUS)}
                typeInput={TYPE_INPUT.SELECT}
                allowClear
              />
            </Col>
            <Col lg={4} sm={12} xs={24}>
              <FormWrapper
                placeholder={intl.formatMessage({ id: 'sale.order.management.method' })}
                options={formatMethodOptions}
                name={METHOD}
                onChange={handleChangeField(setFieldValue, METHOD)}
                typeInput={TYPE_INPUT.SELECT}
                allowClear
              />
            </Col>
            <Col lg={9} sm={24} xs={24}>
              <ReloadOutlined
                onClick={handleResetForm}
                className={styleLess.sale_order_search__row__reset}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default memo(SearchSaleOrder);
