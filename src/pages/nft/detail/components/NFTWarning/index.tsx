import EllipsisText from '@/components/EllipsisText';
import { useIntl } from '@umijs/max';
import React, { Fragment } from 'react';
import styleLess from './index.less';
import { WarningFilled } from '@ant-design/icons';
import { NFTWarningProps } from '../../typings';
import { getNumber } from '@/utils/utils';
import { NFT_STATUS } from '@/pages/nft/constants';

const NFTWarning = ({ saleOrder, token, status }: NFTWarningProps) => {
  const intl = useIntl();
  const totalMinted = getNumber(token?.totalMinted);
  const totalSupply = getNumber(token?.totalSupply);
  const quantity = getNumber(token?.quantity);

  const supplyMinusMinted = totalSupply - totalMinted;
  const isShowWarning = status === NFT_STATUS[1].value && saleOrder?.isInvalid;

  return (
    <Fragment>
      {isShowWarning && (
        <div className={styleLess.nft_warning}>
          <WarningFilled className={styleLess.nft_warning__icon} />
          <EllipsisText
            className={styleLess.nft_warning__text}
            text={intl.formatMessage(
              { id: 'NFT.detail.warning' },
              { quantity: quantity, number: supplyMinusMinted },
            )}
          />
        </div>
      )}
    </Fragment>
  );
};

export default NFTWarning;
