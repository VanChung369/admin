import React, { useRef } from 'react';
import { Col, Row } from 'antd';
import { Form, Formik } from 'formik';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import trim from 'lodash/trim';
import isString from 'lodash/isString';
import { NFT_MARKET_CHANNEL, NFT_SALE_HISTORY_FIELD } from '@/pages/nft/constants';
import { LENGTH_CONSTANTS } from '@/constants';
import { useIntl } from '@umijs/max';
import { useChangeAddress } from '@/hooks/hook-customs/useChangeAddress';
import { ReloadOutlined } from '@ant-design/icons';
import { initialValues } from '.';
import styleLess from './index.less';
import FormWrapper from '@/components/FormWrapper';
import { TYPE_INPUT } from '@/constants/input';
import { disabledFromDate, disabledUntilDate } from '@/utils/utils';

const { KEYWORD, FROM, UNTIL, TYPE, PAGE, LIMIT } = NFT_SALE_HISTORY_FIELD;

const { DEFAULT_PAGE } = LENGTH_CONSTANTS;

const Search = ({ onSetParams, params }: any) => {
  const intl = useIntl();
  const formRef = useRef<any>(null);
  const initialParams = omit({ ...initialValues }, [PAGE, LIMIT]) as any;

  const optionSelect = NFT_MARKET_CHANNEL.map((marketChannel) => ({
    ...marketChannel,
    name: intl.formatMessage({ id: marketChannel?.name }),
  }));

  const handleResetForm = () => {
    formRef?.current?.resetForm();
    onSetParams({
      ...initialParams,
      ...initialValues,
      [PAGE]: DEFAULT_PAGE,
    });
  };

  useChangeAddress({ callback: handleResetForm });

  const handleFieldChange = (setFieldValue: any, name: string) => (value: any) => {
    setFieldValue(name, isString(value) ? trim(value) : value);
    onSetParams({
      ...params,
      [name]: isString(value) ? trim(value) : value,
      [PAGE]: DEFAULT_PAGE,
    });
  };

  return (
    <Formik initialValues={initialParams} onSubmit={noop} innerRef={formRef}>
      {({ setFieldValue, values }) => (
        <Form className={styleLess.nft_detail_history_search}>
          <Row gutter={20} className={styleLess.nft_detail_history_search__row} align={'middle'}>
            <Col lg={7} sm={12} xs={24}>
              <FormWrapper
                name={KEYWORD}
                placeholder={intl.formatMessage({ id: 'NFT.detail.history.search.token.id' })}
                onSearch={handleFieldChange(setFieldValue, KEYWORD)}
                typeInput={TYPE_INPUT.SEARCH_DEBOUNCE}
              />
            </Col>
            <Col lg={3} sm={12} xs={24}>
              <FormWrapper
                name={FROM}
                placeholder={intl.formatMessage({ id: 'NFT.detail.history.search.start.date' })}
                onChange={handleFieldChange(setFieldValue, FROM)}
                disabledDate={disabledFromDate(values?.[UNTIL])}
                typeInput={TYPE_INPUT.DATE}
              />
            </Col>
            <Col lg={3} sm={12} xs={24}>
              <FormWrapper
                name={UNTIL}
                placeholder={intl.formatMessage({ id: 'NFT.detail.history.search.end.date' })}
                onChange={handleFieldChange(setFieldValue, UNTIL)}
                disabledDate={disabledUntilDate(values?.[FROM])}
                typeInput={TYPE_INPUT.DATE}
              />
            </Col>
            <Col lg={4} sm={12} xs={24}>
              <FormWrapper
                name={TYPE}
                placeholder={intl.formatMessage({ id: 'NFT.detail.history.search.market.channel' })}
                onChange={handleFieldChange(setFieldValue, TYPE)}
                typeInput={TYPE_INPUT.SELECT}
                options={optionSelect}
                allowClear
              />
            </Col>
            <Col lg={1} sm={12} xs={24}>
              <ReloadOutlined
                onClick={handleResetForm}
                className={styleLess.nft_detail_history_search__row__reset}
              />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default Search;
