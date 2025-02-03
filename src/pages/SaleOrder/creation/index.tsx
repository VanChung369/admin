import LoadingWrapper from '@/components/LoadingWrapper';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useNavigate, useParams } from '@umijs/max';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { saleOrderSchema } from '../schema';
import { SALE_ORDER_CREATE_FIELD, SALE_ORDER_CREATE_METHOD } from '../constants';
import { useWarnModalPage } from '@/hooks/hook-customs/useWarnModal';
import PageHeader from '@/components/PageHeader';
import ROUTES_PATH from '@/constants/routesPath';
import { useCreateSaleOrder } from '../hooks';
import { Col, Row } from 'antd';
import NFTPreview from '@/pages/nft/creation/components/NFTPreview';
import formatMessage from '@/components/FormatMessage';
import SaleOrderField from './components/SaleOrderField';
import SaleOrderButton from './components/SaleOrderButton';
import { TOKEN_SUPPORT } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedQuantity from '@/redux/saleOrder/selector';
import { useChangeDate } from '@/hooks/hook-customs/useChangeDate';
import ModalUnsavedChange from './components/ModalUnsaved';
import { checkValueChange } from '@/utils/utils';
import { trim } from 'lodash';
import moment from 'moment';
import AuthorizeTModal from './components/ModalAuthorize';
import MetamaskService from '@/services/blockchain';
import { useAddress } from '@thirdweb-dev/react';

const { QUANTITY, UNIT_PRICE, CURRENCY, METHOD, NFT_ID, START_DATE, END_DATE } =
  SALE_ORDER_CREATE_FIELD;

const initFormValue = {
  [QUANTITY]: '',
  [UNIT_PRICE]: '',
  [CURRENCY]: TOKEN_SUPPORT.value,
  [METHOD]: '',
  [NFT_ID]: '',
  [START_DATE]: '',
  [END_DATE]: '',
} as any;

const SaleOrderCreation = () => {
  const intl = useIntl();
  const account = useAddress();
  const formikRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const { quantity } = useAppSelector(selectedQuantity.getQuantity);
  const {
    errorStartDate,
    errorEndDate,
    setErrorStartDate,
    setErrorEndDate,
    setStartDate,
    setEndDate,
  } = useChangeDate();
  const { loading, onCreateSaleOrder } = useCreateSaleOrder();

  const {
    visibleModalUnsaved,
    setValueChange,
    onCloseModalUnsaved,
    afterCloseModalUnsaved,
    onBackClick,
    onDiscard,
  } = useWarnModalPage(ROUTES_PATH.SALE);

  const handleToggleAuthorize = () => setVisible(!visible);

  const handleCreateSaleOrderFail = () => {
    setVisible(false);
    formatMessage({
      descriptor: { id: 'codeMessage.E13' },
      type: 'error',
    });
  };

  const handleCreateSaleOrderSuccess = () => {
    setVisible(false);
    navigate(`${ROUTES_PATH.SALE}`);
    formatMessage({
      descriptor: { id: 'codeMessage.S4' },
      type: 'success',
    });
  };

  const handleSubmit = async (values: any = {}) => {
    handleToggleAuthorize();

    const wallet = new MetamaskService().getInstance();

    const isAdmin = await wallet.isAdmin(account as string);

    if (!isAdmin) {
      handleCreateSaleOrderFail();
      return false;
    }

    const data = {
      [QUANTITY]: values?.[QUANTITY],
      [UNIT_PRICE]: values?.[UNIT_PRICE],
      [CURRENCY]: values?.[CURRENCY],
      [METHOD]: values?.[METHOD],
      [NFT_ID]: trim(values?.[NFT_ID]),
      [START_DATE]:
        values?.[METHOD] == SALE_ORDER_CREATE_METHOD[0].value
          ? ''
          : moment(values?.[START_DATE]).toISOString(),
      [END_DATE]:
        values?.[METHOD] == SALE_ORDER_CREATE_METHOD[0].value
          ? ''
          : moment(values?.[END_DATE]).toISOString(),
    } as any;

    onCreateSaleOrder({
      data: data,
      onSuccess: handleCreateSaleOrderSuccess,
      onError: handleCreateSaleOrderFail,
    });
  };

  return (
    <PageContainer title={false}>
      <LoadingWrapper loading={loading}>
        <PageHeader
          showBack
          title={intl.formatMessage({
            id: 'sale.order.create',
          })}
          onBack={onBackClick}
        />
        <Formik
          innerRef={formikRef}
          initialValues={initFormValue}
          onSubmit={handleSubmit}
          validationSchema={saleOrderSchema(
            intl,
            quantity,
            setStartDate,
            setEndDate,
            setErrorStartDate,
            setErrorEndDate,
            errorStartDate,
            errorEndDate,
          )}
          enableReinitialize
        >
          {({ values }: any) => {
            setValueChange(checkValueChange(initFormValue, values));
            return (
              <Form>
                <Row gutter={20} justify="space-between">
                  <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
                    <SaleOrderField />
                    <SaleOrderButton isSubmit={loading} onDiscard={onDiscard} />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <NFTPreview />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>

        <ModalUnsavedChange
          visible={visibleModalUnsaved}
          onClose={onCloseModalUnsaved}
          backUrl={ROUTES_PATH.SALE}
          afterClose={afterCloseModalUnsaved}
        />

        <AuthorizeTModal
          visible={visible}
          onClose={handleToggleAuthorize}
          title={intl.formatMessage({ id: 'common.text.authorizing.account.title' })}
        />
      </LoadingWrapper>
    </PageContainer>
  );
};

export default SaleOrderCreation;
