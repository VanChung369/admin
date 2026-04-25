import EllipsisText from '@/components/EllipsisText';
import TagWrapper from '@/components/TagWrapper';
import { NFT_STATUS } from '@/pages/nft/constants';
import { formatDate } from '@/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import React, { Fragment } from 'react';
import styleLess from './index.less';
import TypographyWrapper from '@/components/TypographyWrapper';
import { TYPE_TYPOGRAPHY } from '@/constants/type';

const General = () => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const query: any = queryClient.getQueryData(['getNFT', id]);
  const status: any = NFT_STATUS.find((item) => item?.value === query?.status);

  return (
    <Fragment>
      <EllipsisText text={query?.name} className={styleLess.nft_detail_info__name} />
      <p className={styleLess.nft_detail_info__date}>
        {intl.formatMessage({ id: 'NFT.detail.create.at' })} {formatDate(query?.createdAt)}
      </p>
      {status && (
        <TagWrapper
          color={status?.color}
          text={intl.formatMessage({ id: status?.name })}
          className={styleLess.nft_detail_info__status}
        />
      )}
      <TypographyWrapper
        className={styleLess.nft_detail_info__description}
        classNameLess={styleLess.nft_detail_info__description_expandable}
        justify="end"
        typeTypography={TYPE_TYPOGRAPHY.TEXT_EXPAND}
        rowsNumber={2}
        text={query?.description}
      />
    </Fragment>
  );
};

export default General;
