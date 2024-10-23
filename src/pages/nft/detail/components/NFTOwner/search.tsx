import React, { useEffect, useRef } from 'react';
import { Form, Formik } from 'formik';
import { Col, Row } from 'antd';
import { LENGTH_CONSTANTS } from '@/constants';
import { useChangeAddress } from '@/hooks/hook-customs/useChangeAddress';
import { NFT_MANAGEMENT_FIELD } from '@/pages/nft/constants';
import FormWrapper from '@/components/FormWrapper';
import { TYPE_INPUT } from '@/constants/input';
import { useIntl } from '@umijs/max';
import styleLess from './index.less';

const { DEFAULT_PAGE } = LENGTH_CONSTANTS;

const { KEYWORD } = NFT_MANAGEMENT_FIELD;

const initialValues = {
  [KEYWORD]: '',
};

const Search = ({ onSetParams, params }: any) => {
  const intl = useIntl();
  const formikRef = useRef<any>(null);

  // useEffect(() => {
  //   handleResetForm();
  // }, []);

  const handleInputSearch = (setFieldValue: any) => (value: string) => {
    setFieldValue([KEYWORD], value?.trim());
    onSetParams({
      ...params,
      [KEYWORD]: value?.trim(),
      page: DEFAULT_PAGE,
    });
  };

  const handleSubmit = (values: any) => handleInputSearch(values?.[KEYWORD]) as any;

  const handleResetForm = () => {
    formikRef?.current?.resetForm();
    onSetParams({
      ...params,
      ...initialValues,
      page: DEFAULT_PAGE,
    });
  };

  useChangeAddress({ callback: handleResetForm });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} innerRef={formikRef}>
      {({ setFieldValue }) => (
        <Form className={styleLess.nft_detail_search}>
          <Row gutter={20}>
            <Col lg={10} sm={12} xs={24}>
              <FormWrapper
                name={KEYWORD}
                placeholder={intl.formatMessage({ id: 'NFT.detail.search.owner.placeholder' })}
                onSearch={handleInputSearch(setFieldValue)}
                typeInput={TYPE_INPUT.SEARCH_DEBOUNCE}
              />
            </Col>
            <Col lg={10} sm={12} xs={24}></Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default Search;
