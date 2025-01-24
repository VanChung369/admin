import React, { Fragment } from 'react';
import { Card, Col, Row, Image } from 'antd';
import classNames from 'classnames';
import { DetailItemProps, DetailModalProps } from '../../typings';
import { Link, useIntl } from '@umijs/max';
import {
  formatDate,
  getAttributeFieldNFTValues,
  getDefaultFieldNFTValues,
  getNumber,
} from '@/utils/utils';
import { NFT_MARKET_CHANNEL } from '@/pages/nft/constants';
import { ResellDetailItem, SellDetailItem } from './columns';
import ModalWrapper from '@/components/ModalWrapper';
import styleLess from './index.less';
import LoadingWrapper from '@/components/LoadingWrapper';
import EllipsisText from '@/components/EllipsisText';
import ROUTES_PATH, { EXTERNAL_URL } from '@/constants/routesPath';
import ButtonWrapper from '@/components/ButtonWrapper';
import CoinIcon from '@/resources/images/coin_icon.png';
import ShortenAddress from '@/components/ShortenAddress';
import imageError from '@/resources/images/image-error.png';

const RevenueDetailModal = ({ visible, onClose, dataRevenue = {}, loading }: DetailModalProps) => {
  const intl = useIntl();

  const { saleOrder = {} } = dataRevenue;

  const priceUsd = getNumber(saleOrder?.unitPrice * saleOrder?.currency?.usd);
  const subTotal = getNumber(saleOrder?.unitPrice * dataRevenue?.quantity);
  const subTotalUsd = getNumber(
    saleOrder?.unitPrice * saleOrder?.currency?.usd * dataRevenue?.quantity,
  );

  const isPrimary = saleOrder?.type === NFT_MARKET_CHANNEL[1].value;

  const detailItem = isPrimary
    ? SellDetailItem(dataRevenue, priceUsd, subTotal, subTotalUsd)
    : ResellDetailItem(dataRevenue, priceUsd, subTotal, subTotalUsd);

  const renderDetailItem = ({
    label,
    value,
    prefixIcon,
    currency,
    usd,
    address,
    isAdmin,
    noShort,
    royalties,
    className,
  }: DetailItemProps) => {
    return (
      <div className={classNames(styleLess.revenue_modal__row__col__general, className)}>
        <div className={styleLess.revenue_modal__row__col__general_label}>
          <EllipsisText text={intl.formatMessage({ id: label })} />
          {royalties && (
            <EllipsisText
              className={styleLess.revenue_modal__row__col__general_label__royalties}
              text={`(${royalties}%)`}
            />
          )}
        </div>
        <div className={styleLess.revenue_modal__row__col__general_content}>
          {CoinIcon && (
            <Fragment>
              <div className={styleLess.revenue_modal__row__col__general_content__currency}>
                {prefixIcon && (
                  <img
                    src={prefixIcon}
                    className={styleLess.revenue_modal__row__col__general_content__currency__icon}
                  />
                )}
                {value && (
                  <EllipsisText
                    className={styleLess.revenue_modal__row__col__general_content__currency__value}
                    text={value}
                  />
                )}
                {currency && (
                  <EllipsisText
                    text={currency}
                    className={styleLess.revenue_modal__row__col__general_content__currency__text}
                  />
                )}
              </div>
              {usd && (
                <EllipsisText
                  className={styleLess.revenue_modal__row__col__general_content__currency__usd}
                  text={`($ ${usd})`}
                />
              )}
            </Fragment>
          )}
          {address && (
            <div className={styleLess.revenue_modal__row__col__general_content__address}>
              {isAdmin && (
                <EllipsisText
                  className={styleLess.revenue_modal__row__col__general_content__address__admin}
                  text={intl.formatMessage({ id: 'common.text.admin' })}
                />
              )}
              {noShort ? (
                <ShortenAddress address={address} extraShort={true} />
              ) : (
                <ShortenAddress address={address} extraShort={true} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <ModalWrapper width={796} onClose={onClose} open={visible}>
      <div className={styleLess.revenue_modal}>
        <LoadingWrapper loading={loading}>
          <EllipsisText
            text={intl.formatMessage({ id: 'revenue.management.primary.sale.details' })}
            className={styleLess.revenue_modal__title}
          />
          <EllipsisText
            text={formatDate(dataRevenue?.createdAt)}
            className={styleLess.revenue_modal__time_sale}
          />
          <Row className={styleLess.revenue_modal__row}>
            <Col md={10}>
              <Card hoverable className={styleLess.revenue_modal___preview}>
                {!dataRevenue?.nft?.image?.url ? (
                  <Image preview={false} src="error" fallback={imageError} />
                ) : (
                  <Image src={dataRevenue?.nft?.image?.url} preview={true} />
                )}
              </Card>
            </Col>
            <Col md={14}>
              <div className={styleLess.revenue_modal__row__col__general}>
                <EllipsisText
                  text={intl.formatMessage({ id: 'revenue.management.quantity' })}
                  className={styleLess.revenue_modal__row__col__general_quantity}
                />
                {dataRevenue?.quantity ? <EllipsisText text={dataRevenue?.quantity} /> : 0}
              </div>
              {detailItem?.map((item, index) => (
                <Fragment key={index}>{renderDetailItem(item)}</Fragment>
              ))}
              <div className={styleLess.revenue_modal__row__col__general}>
                <Link to={`${ROUTES_PATH.NFT_DETAIL}/${dataRevenue?.nft?.id}`} target="_blank">
                  <ButtonWrapper
                    text={intl.formatMessage({ id: 'revenue.management.view.nft.detail' })}
                    className={styleLess.revenue_modal__row__col__general_button__detail}
                  />
                </Link>
                <Link
                  to={`${EXTERNAL_URL.POLYGON_SCAN_TOKEN}/${dataRevenue?.hash}`}
                  target="_blank"
                >
                  <ButtonWrapper
                    text={intl.formatMessage({ id: 'revenue.management.on.polygonscan' })}
                    className={styleLess.revenue_modal__row__col__general_button__polygonscan}
                  />
                </Link>
              </div>
            </Col>
          </Row>
        </LoadingWrapper>
      </div>
    </ModalWrapper>
  );
};

export default RevenueDetailModal;
