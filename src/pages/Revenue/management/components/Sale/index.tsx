import React, { Fragment } from 'react';
import { Col, Row } from 'antd';
import { SaleItemType, SaleProps } from '../../typings';
import EllipsisText from '@/components/EllipsisText';
import ItemWithLabel from '@/components/ItemWithLabel';
import { useIntl } from '@umijs/max';
import NumberWrapper from '@/components/NumberWrapper';
import { REVENUE_DECIMAL_SCALE } from '@/pages/Revenue/constants';
import { DOLLAR_TEXT, NFT_DECIMAL_SCALE } from '@/constants/input';
import NumberFormatWrapper from '@/components/NumberFormatWrapper';
import styleLess from './index.less';

const Sale = ({ saleItem }: SaleProps) => {
  const intl = useIntl();

  const renderSaleItem = ({ label, value, toolTip, appIcon, currency, usd }: SaleItemType) => {
    return (
      <Fragment>
        <div className={styleLess.sale__lable}>
          <ItemWithLabel
            labelClassName={styleLess.sale__lable_text}
            helpText={toolTip}
            label={intl.formatMessage({ id: label })}
          ></ItemWithLabel>
        </div>
        <div className={styleLess.sale__info}>
          {appIcon ? (
            <Fragment>
              <img src={appIcon} className={styleLess.sale__info_icon} />
              <NumberWrapper
                thousandSeparator
                displayType="text"
                value={value}
                decimalScale={REVENUE_DECIMAL_SCALE}
              />
              <EllipsisText text={`${currency}`} className={styleLess.sale__info_currency} />
            </Fragment>
          ) : (
            <NumberWrapper
              thousandSeparator
              displayType="text"
              value={value}
              className={styleLess.sale__info_value}
              decimalScale={REVENUE_DECIMAL_SCALE}
            />
          )}
        </div>

        {usd && (
          <div className={styleLess.sale__usd}>
            ({DOLLAR_TEXT}&nbsp;
            <NumberFormatWrapper value={usd} decimalScale={NFT_DECIMAL_SCALE} />)
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Row justify="space-between" className={styleLess.sale}>
      {saleItem?.map((item, index) => (
        <Col key={index} md={6} className={styleLess.sale__col}>
          {renderSaleItem(item)}
        </Col>
      ))}
    </Row>
  );
};

export default Sale;
