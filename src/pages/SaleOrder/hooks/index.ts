// get list nfts

import { ORDERS } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { getSaleOrders } from '@/services/api/sale-order';
import { useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';
import { SALE_ORDER_MANAGEMENT_FIELD, SALE_ORDER_MANAGEMENT_FIELD_SORTER } from '../constants';

const { DEFAULT, CREATED_AT, SOLD, QUANTITY, REMAIN, UNIT_PRICE } =
  SALE_ORDER_MANAGEMENT_FIELD_SORTER;
const { ASC, DESC, FIELD, ORDER } = ORDERS;
const { SORT } = SALE_ORDER_MANAGEMENT_FIELD;

export const useGetListSaleOrder = (params: any) => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const INDEXED_SORTER = {
    [DEFAULT]: { [CREATED_AT]: DESC },
    [CREATED_AT]: { [CREATED_AT]: DESC },
    [SOLD]: { [SOLD]: ASC, [CREATED_AT]: DESC },
    [QUANTITY]: { [QUANTITY]: ASC, [CREATED_AT]: DESC },
    [REMAIN]: { [REMAIN]: ASC, [CREATED_AT]: DESC },
    [UNIT_PRICE]: { [UNIT_PRICE]: ASC, [CREATED_AT]: DESC },
  };

  const newParams = omit({ ...params }, [FIELD, ORDER]) as any;
  const field = params?.[FIELD] || DEFAULT;

  for (const key in INDEXED_SORTER?.[field]) {
    if (key === field && params?.[ORDER] && params?.[FIELD]) {
      newParams[`${SORT}[${key}]`] = params?.[ORDER];
    } else {
      newParams[`${SORT}[${key}]`] = INDEXED_SORTER?.[field]?.[key];
    }
  }

  for (const key in newParams) {
    if (!newParams[key]) {
      delete newParams[key];
    }
  }
  const handleGetListNFTs = async () => {
    try {
      const response = await getSaleOrders(newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListNFTs: any = useQuery({
    queryKey: ['getListSaleOrders', newParams, address],
    queryFn: () => handleGetListNFTs(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading } = useFetchListNFTs;

  return {
    loading: isLoading,
    data: useFetchListNFTs.data,
  };
};
