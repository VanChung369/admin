import { ORDERS } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { createSaleOrders, getSaleOrder, getSaleOrders } from '@/services/api/sale-order';
import { useMutation, useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';
import { SALE_ORDER_MANAGEMENT_FIELD, SALE_ORDER_MANAGEMENT_FIELD_SORTER } from '../constants';
import { createTransactions, updateTransactions } from '@/services/api/transaction';

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

// create sale order
export interface paramCreateSaleOrder {
  data: any;
  onSuccess: (id?: any) => void;
  onError: () => void;
}

export const useCreateSaleOrder = () => {
  const handleCreateSaleOrder = useMutation({
    mutationFn: async (params: paramCreateSaleOrder) => {
      try {
        const newParams = omit({ ...params.data });

        for (const key in newParams) {
          if (!newParams[key]) {
            delete newParams[key];
          }
        }

        const response = await createSaleOrders(newParams);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onError: (error, variables, context) => {
      variables.onError();
    },
    onSuccess: (data, variables, context) => {
      variables.onSuccess(data._id);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return {
    loading: handleCreateSaleOrder.isPending,
    onCreateSaleOrder: handleCreateSaleOrder.mutate,
  };
};

//get sale order
export const useGetSaleOrder = (id?: string) => {
  const handleGetSaleOrder = async () => {
    try {
      const data = await getSaleOrder(id);

      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const useFetchSaleOrder: any = useQuery({
    queryKey: ['getSaleOrder', id],
    queryFn: () => handleGetSaleOrder(),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const { isLoading, isError } = useFetchSaleOrder;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchSaleOrder.data,
  };
};

export interface paramCreateTransaction {
  data: any;
  onSuccess: (id?: any, data?: any) => void;
  onError: () => void;
}

export interface paramUpdateTransaction {
  id: string;
  data: any;
  onSuccess: () => void;
  onError: () => void;
}

export const useCreateTransaction = () => {
  const handleCreateTransaction = useMutation({
    mutationFn: async (params: paramCreateTransaction) => {
      try {
        const response = await createTransactions(params.data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onError: (error, variables, context) => {
      variables.onError();
    },
    onSuccess: (data, variables, context) => {
      const dataRequest = data?.signature?.dataRequest || [];
      variables.onSuccess(data._id, dataRequest);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return {
    loading: handleCreateTransaction.isPending,
    onCreateTransaction: handleCreateTransaction.mutate,
  };
};

export const useUpdateTransaction = () => {
  const handleUpdateTransaction = useMutation({
    mutationFn: async (params: paramUpdateTransaction) => {
      try {
        const response = await updateTransactions(params.id, params.data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onError: (error, variables, context) => {
      variables.onError();
    },
    onSuccess: (data, variables, context) => {
      variables.onSuccess();
    },
    onSettled: (data, error, variables, context) => {},
  });

  return {
    loading: handleUpdateTransaction.isPending,
    onUpdateTransaction: handleUpdateTransaction.mutate,
  };
};
