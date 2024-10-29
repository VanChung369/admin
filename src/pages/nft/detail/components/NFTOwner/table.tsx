import TableWrapper from '@/components/TableWrapper';
import { EMPTY_DEFAULT_TEXT } from '@/constants/input';
import { NFT_STANDARD } from '@/pages/nft/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl, useParams } from '@umijs/max';
import React, { useMemo } from 'react';
import { columns } from './columns';

type TableOwnerProps = {
  total: number;
  listOwner: Array<any> | undefined;
  limit: number;
  page: number;
  loading: boolean;
  handleChangePaging: (page: number, limit: number) => void;
};

const COLUMNS = { QUANTITY: 'quantity', MINTED_BY: 'mintedBy' };

const TableOwner = ({
  total,
  listOwner,
  limit,
  page,
  loading,
  handleChangePaging,
}: TableOwnerProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const query: any = queryClient.getQueryData(['getNFT', id]);

  const contractAddress = query?.token?.address ?? EMPTY_DEFAULT_TEXT;
  const is721Standard = query?.token?.standard === NFT_STANDARD[0].value;

  const columnsByStandard = (column: any) => {
    return columns(intl, page, limit, contractAddress).filter((item) => item.key !== column);
  };

  const columns721 = columnsByStandard(COLUMNS.QUANTITY);
  const columns1155 = columnsByStandard(COLUMNS.MINTED_BY);

  const renderColumns = useMemo(() => {
    switch (true) {
      case is721Standard:
        return columns721;
      default:
        return columns1155;
    }
  }, [is721Standard, contractAddress, page]);

  return (
    <TableWrapper
      total={total}
      columns={renderColumns}
      loading={loading}
      dataSource={listOwner}
      pageSize={limit}
      current={page}
      onChangePagination={handleChangePaging}
      rowKey={(row: any) => row?.tokenId}
    />
  );
};

export default TableOwner;
