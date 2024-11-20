import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { NFT_CREATE_FIELD, NFT_ZERO_ID } from '@/pages/nft/constants';
import { useAppSelector } from '@/hooks';
import selectedConfig from '@/redux/config/selector';
import styleLess from './index.less';
import EllipsisText from '../EllipsisText';
import { useIntl, useModel } from '@umijs/max';
import ShortenAddress from '../ShortenAddress';
import NoProfile from '@/resources/images/no-profile-md.png';
import NumberWrapper from '../NumberWrapper';
import { TOKEN_SUPPORT } from '@/constants';

type PreviewContentProps = {
  nft: any;
  saleOrder?: any;
  children?: ReactNode;
};

const NFTPreviewContent = ({ nft, saleOrder, children }: PreviewContentProps) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  return (
    <div className={styleLess.preview}>
      <div className={styleLess.preview__content}>
        <EllipsisText
          text={nft?.[NFT_CREATE_FIELD.NAME]}
          className={styleLess.preview__content__name}
        />
        <div className={styleLess.preview__content_user}>
          <div className={styleLess.preview__content_user_avatar}>
            {initialState?.currentUser?.avatar ? (
              <img
                src={initialState.currentUser.avatar}
                className={styleLess.preview__content_user_avatar__image}
              />
            ) : (
              <img src={NoProfile} className={styleLess.preview__content_user_avatar__image} />
            )}
          </div>
          <div className={styleLess.preview__content_user_address}>
            <ShortenAddress
              address={nft?.creatorAddress ? nft?.creatorAddress : currentUser?.address}
              extraShort={true}
            />
          </div>
        </div>
        <Row className={styleLess.preview__content_sub_title}>
          <Col span={8} className={styleLess.preview__content_sub_title__price}>
            <div> {intl.formatMessage({ id: 'NFT.create.price' })}</div>
            <div>
              {saleOrder?.unitPrice ? (
                <>
                  <NumberWrapper
                    thousandSeparator
                    value={saleOrder?.unitPrice}
                    displayType="text"
                  />{' '}
                  {TOKEN_SUPPORT.symbol}
                </>
              ) : (
                '---'
              )}
            </div>
          </Col>
          <Col span={8} offset={8} className={styleLess.preview__content_sub_title__total}>
            <div>
              <div>{intl.formatMessage({ id: 'NFT.create.quantity' })}</div>
              <div>
                {saleOrder?.quantity ? (
                  <NumberWrapper thousandSeparator value={saleOrder?.quantity} displayType="text" />
                ) : (
                  '---'
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NFTPreviewContent;
