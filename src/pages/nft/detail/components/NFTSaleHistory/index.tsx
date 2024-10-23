import formatMessage from '@/components/FormatMessage';
import { LENGTH_CONSTANTS } from '@/constants';
import { NFT_SALE_HISTORY_FIELD } from '@/pages/nft/constants';
import { useGetListNFTSaleHistory } from '@/pages/nft/hooks';
import { useIntl, useNavigate, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import styleLess from './index.less';
import Search from './search';
import ItemWithLabel from '@/components/ItemWithLabel';
import NumberWrapper from '@/components/NumberWrapper';
import TableHistory from './table';

const { KEYWORD, FROM, UNTIL, TYPE, PAGE, LIMIT } = NFT_SALE_HISTORY_FIELD;
const { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } = LENGTH_CONSTANTS;

export const initialValues = {
  [KEYWORD]: '',
  [FROM]: null,
  [UNTIL]: null,
  [TYPE]: undefined,
  [PAGE]: DEFAULT_PAGE,
  [LIMIT]: DEFAULT_PAGE_SIZE,
};

const NFTSaleHistory = () => {
  const intl = useIntl();
  const { id } = useParams();
  const [params, setParams] = useState(initialValues);
  const { loading, error, data } = useGetListNFTSaleHistory(id!, params);

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
        descriptor: { id: 'codeMessage.E11' },
        type: 'error',
      });
    }
  }, [error]);

  return (
    <div className={styleLess.nft_history}>
      <Search onSetParams={setParams} params={params} loading={loading} />
      <ItemWithLabel
        label={intl.formatMessage({
          id: 'NFT.detail.history.total.revenue',
        })}
        className={styleLess.nft_history__total}
        labelClassName={styleLess.nft_history__total_label}
        contentClass={styleLess.nft_history__total_content}
      >
        <NumberWrapper thousandSeparator value={data?.totalRevenue} displayType="text" />
      </ItemWithLabel>
      <TableHistory
        listHistory={data?.docs}
        total={data?.totalDocs}
        page={params?.page as number}
        limit={params?.limit as number}
        loading={loading}
        handleChangePaging={handleChangePaging}
        onSetParams={setParams}
        params={params}
      />
    </div>
  );
};
export default NFTSaleHistory;
