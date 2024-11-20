import {
  disabledSaleOrderEndDate,
  disabledSaleOrderStartDate,
  getNumber,
  limitMaxlengNumber,
  limitPercentage,
} from '@/utils/utils';
import { useIntl } from '@umijs/max';
import { Card, Col, Row, Select, Tooltip } from 'antd';
import { useFormikContext } from 'formik';
import styleLess from './index.less';
import FormWrapper from '@/components/FormWrapper';
import {
  DEFAULT_SEARCH_DATE_TIME_FORMAT,
  MAX_LENGTH_TOTAL_SUPPLY,
  MAX_VALUE_PIRCE,
  MAX_VALUE_TOTAL_COPIES,
  NFT_DECIMAL_SCALE_PRICE,
  TYPE_INPUT,
  ZERO_VALUE,
} from '@/constants/input';
import { SALE_ORDER_CREATE_FIELD, SALE_ORDER_CREATE_METHOD } from '@/pages/SaleOrder/constants';
import InstantSale from '@/resources/svg/sale.svg';
import TimedAuction from '@/resources/svg/time.svg';
import ButtonWrapper from '@/components/ButtonWrapper';
import { DECIMAL_SCALE } from '@/constants/number';
import { getNfts } from '@/services/api/nft';
import EllipsisText from '@/components/EllipsisText';
import ResponsiveImage from '@/components/ResponsiveImage';
import { NFT_STANDARD, NFT_STATUS } from '@/pages/nft/constants';
import { useQueryClient } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useGetConfig } from '@/hooks/hook-customs/useGetConfig';
import { useEffect, useMemo } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/hooks';
import { handleSetQuantity } from '@/redux/saleOrder/slice';
const { Option } = Select;
const SaleOrderField = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { values, setFieldValue } = useFormikContext() as any;
  const { mintingQuantityMax } = useGetConfig();
  const queryClient = useQueryClient();
  const query: any = queryClient.getQueryData(['infinityScrollSelectNft', '']);

  const dataNft: any = uniqBy(query?.pages.flatMap((page: any) => page?.docs) || [], '_id').find(
    (item: any) => item._id === values?.nftID,
  );

  const is721Standard = NFT_STANDARD[0].value === dataNft?.token?.standard;
  const totalMinted = getNumber(dataNft?.totalMinted);
  const totalSupply = getNumber(dataNft?.totalSupply);
  const onSaleQuantity = getNumber(dataNft?.onSaleQuantity);
  const maxLimit = totalSupply - totalMinted - onSaleQuantity;

  useEffect(() => {
    // <-- Use useEffect here
    if (maxLimit) {
      dispatch(
        handleSetQuantity({
          quantity: maxLimit,
        }),
      );
    } else {
      dispatch(
        handleSetQuantity({
          quantity: 0,
        }),
      );
    }
  }, [maxLimit, dispatch]);

  const limitMinted = useMemo(() => {
    if (is721Standard && maxLimit > mintingQuantityMax) {
      return mintingQuantityMax;
    }

    return maxLimit;
  }, [totalSupply, totalMinted, onSaleQuantity, is721Standard, mintingQuantityMax]);

  const method = SALE_ORDER_CREATE_METHOD.map((method) => {
    return {
      title: intl.formatMessage({
        id: method.title,
      }),
      description: intl.formatMessage({
        id: method.description,
      }),
      value: method.value,
      avatar: method.value === SALE_ORDER_CREATE_METHOD[0].value ? InstantSale : TimedAuction,
    };
  });

  const fetchData = async ({ limit, offset, searchValue }: any) => {
    const param = {
      keyword: searchValue,
      page: offset,
      limit: limit,
      status: NFT_STATUS[0].value,
    };
    try {
      const response = await getNfts(param);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { docs: [], totalDocs: 0 };
    }
  };

  const renderNft = ({ item }: { item: any }) => {
    return (
      <Option key={item?._id} value={item?._id} name={item?.name}>
        <div className={styleLess.sale_order__nft}>
          <ResponsiveImage src={item?.image?.smallUrl} />
          <div>
            <EllipsisText text={item?.name} />
            <EllipsisText text={item?.type} />
          </div>
        </div>
      </Option>
    );
  };

  const handleChangeValueNFT = (setFieldValue: any) => (value: any) => {
    setFieldValue([SALE_ORDER_CREATE_FIELD.NFT_ID], value?.item?._id);
  };

  const handleSetMaxQuantity = (setFieldValue: any) => () => {
    setFieldValue(SALE_ORDER_CREATE_FIELD.QUANTITY, limitMinted);
  };

  return (
    <div className={styleLess.sale_order_creation}>
      <Card className={styleLess.sale_order_creation__field}>
        <Row gutter={20}>
          <Col md={24} xs={24}>
            <FormWrapper
              className={styleLess.sale_order_creation__method_input}
              name={SALE_ORDER_CREATE_FIELD.METHOD}
              label={intl.formatMessage({ id: 'sale.order.create.method' })}
              typeInput={TYPE_INPUT.CHECK_CARD_GROUP}
              options={method}
              size="small"
              required
            />
          </Col>
          <Col md={24} xs={24}>
            <FormWrapper
              typeInput={TYPE_INPUT.SELECT_INFINITY_SCROLL}
              placeholder={intl.formatMessage({
                id: 'sale.order.create.nft',
              })}
              description={intl.formatMessage({
                id: 'sale.order.create.nft.description',
              })}
              required
              name={SALE_ORDER_CREATE_FIELD.NFT_ID}
              label={intl.formatMessage({
                id: 'sale.order.create.nft',
              })}
              fetchData={fetchData}
              renderOption={renderNft}
              queryKey={['infinityScrollSelectNft']}
              onChange={handleChangeValueNFT(setFieldValue)}
            />
          </Col>
          <Col md={24} xs={24}>
            <FormWrapper
              name={SALE_ORDER_CREATE_FIELD.UNIT_PRICE}
              label={intl.formatMessage({
                id: 'sale.order.create.unit.price',
              })}
              description={intl.formatMessage({
                id: 'sale.order.create.unit.price.description',
              })}
              required
              placeholder={intl.formatMessage({
                id: 'sale.order.create.unit.price.placeholder',
              })}
              typeInput={TYPE_INPUT.NUMBER}
              maxLength={MAX_VALUE_PIRCE}
              thousandSeparator
              decimalScale={DECIMAL_SCALE}
              isAllowed={limitMaxlengNumber(NFT_DECIMAL_SCALE_PRICE)}
              autoComplete="off"
            />
          </Col>
          <Col md={24} xs={24}>
            <FormWrapper
              containerClassName={styleLess.sale_order_creation__quantity_input}
              labelClassName={styleLess.sale_order_creation__quantity_label}
              typeInput={TYPE_INPUT.NUMBER}
              label={intl.formatMessage({ id: 'sale.order.create.quantity' })}
              description={intl.formatMessage({ id: 'sale.order.create.quantity.description' })}
              decimalScale={ZERO_VALUE}
              maxLength={MAX_VALUE_TOTAL_COPIES}
              required
              thousandSeparator
              name={SALE_ORDER_CREATE_FIELD.QUANTITY}
              placeholder={intl.formatMessage({ id: 'sale.order.create.quantity.placeholder' })}
              errorClassName={styleLess.error_quantity}
              appendInput={
                <>
                  <ButtonWrapper
                    text={intl.formatMessage({ id: 'sale.order.create.quantity.max' })}
                    className={styleLess.sale_order_creation__quantity_button_max}
                    onClick={handleSetMaxQuantity(setFieldValue)}
                    variant="primary"
                  />
                  <div className={styleLess.sale_order_creation__sub_content}>
                    {intl.formatMessage(
                      { id: 'sale.order.create.quantity.limit' },
                      { number: limitMinted },
                    )}
                    <Tooltip
                      title={intl.formatMessage({ id: 'sale.order.create.quantity.limit.tooltip' })}
                    >
                      <QuestionCircleOutlined
                        className={styleLess.sale_order_creation__sub_content__icon}
                      />
                    </Tooltip>
                  </div>
                </>
              }
              isAllowed={limitMaxlengNumber(MAX_LENGTH_TOTAL_SUPPLY)}
              autoComplete="off"
            />
          </Col>

          {SALE_ORDER_CREATE_METHOD[1]?.value === values?.[SALE_ORDER_CREATE_FIELD.METHOD] && (
            <>
              <Col md={12} xs={24}>
                <FormWrapper
                  name={SALE_ORDER_CREATE_FIELD.START_DATE}
                  label={intl.formatMessage({
                    id: 'sale.order.create.start.date',
                  })}
                  required
                  placeholder={intl.formatMessage({
                    id: 'sale.order.create.start.date.placeholder',
                  })}
                  typeInput={TYPE_INPUT.DATE}
                  format={DEFAULT_SEARCH_DATE_TIME_FORMAT}
                  disabledDate={disabledSaleOrderStartDate(
                    values?.[SALE_ORDER_CREATE_FIELD.END_DATE],
                  )}
                  showTime
                />
              </Col>
              <Col md={12} xs={24}>
                <FormWrapper
                  name={SALE_ORDER_CREATE_FIELD.END_DATE}
                  label={intl.formatMessage({
                    id: 'sale.order.create.end.date',
                  })}
                  required
                  placeholder={intl.formatMessage({
                    id: 'sale.order.create.end.date.placeholder',
                  })}
                  typeInput={TYPE_INPUT.DATE}
                  format={DEFAULT_SEARCH_DATE_TIME_FORMAT}
                  disabledDate={disabledSaleOrderEndDate(
                    values?.[SALE_ORDER_CREATE_FIELD.START_DATE],
                  )}
                  showTime
                />
              </Col>
            </>
          )}
        </Row>
      </Card>
    </div>
  );
};
export default SaleOrderField;
