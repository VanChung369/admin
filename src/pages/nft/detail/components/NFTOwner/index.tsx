import { LENGTH_CONSTANTS } from '@/constants';
import { useGetListNFTOwner } from '@/pages/nft/hooks';
import { useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import TableOwner from './table';
import ItemWithLabel from '@/components/ItemWithLabel';
import NumberWrapper from '@/components/NumberWrapper';
import styleLess from './index.less';
import formatMessage from '@/components/FormatMessage';
import Search from './search';

export const FIELD_NAMES = {
  KEYWORD: 'keyword',
  PAGE: 'page',
  LIMIT: 'limit',
};

const { KEYWORD, PAGE, LIMIT } = FIELD_NAMES;

const initialValues = {
  [KEYWORD]: '',
  [PAGE]: LENGTH_CONSTANTS.DEFAULT_PAGE,
  [LIMIT]: LENGTH_CONSTANTS.DEFAULT_PAGE_SIZE,
};

const NFTOwner = () => {
  const intl = useIntl();
  const { id } = useParams();
  const [params, setParams] = useState(initialValues);
  const { loading, error, data } = useGetListNFTOwner(id!, params);

  const handleChangePaging = (page: number, limit: number) => {
    setParams({
      ...params,
      [PAGE]: limit !== params?.[LIMIT] ? LENGTH_CONSTANTS.DEFAULT_PAGE : page,
      limit,
    });
  };

  useEffect(() => {
    if (error) {
      formatMessage({
        descriptor: { id: 'codeMessage.E10' },
        type: 'error',
      });
    }
  }, [error]);

  return (
    <div className={styleLess.nft_owner}>
      <Search onSetParams={setParams} params={params} />
      <ItemWithLabel
        label={intl.formatMessage({
          id: 'NFT.detail.total.owner',
        })}
        className={styleLess.nft_owner__total}
        labelClassName={styleLess.nft_owner__total_label}
        contentClass={styleLess.nft_owner__total_content}
      >
        <NumberWrapper thousandSeparator value={data?.totalOwners} displayType="text" />
      </ItemWithLabel>
      <TableOwner
        listOwner={data?.docs}
        total={data?.totalOwners}
        page={params?.page as number}
        limit={params?.limit as number}
        loading={loading}
        handleChangePaging={handleChangePaging}
      />
    </div>
  );
};
export default NFTOwner;
