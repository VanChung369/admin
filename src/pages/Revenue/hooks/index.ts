import { ORDERS } from '@/constants';
import { getTransactionDetail, getTransactions } from '@/services/api/transaction';
import { useQuery } from '@tanstack/react-query';
import { REVENUE_MANAGEMENT_FIELD, REVENUE_MANAGEMENT_FIELD_SORTER } from '../constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { omit } from 'lodash';
import { getEndDateTimestamp, getStartDateTimestamp } from '@/utils/utils';

export const useGetTransaction = (id?: string, visible?: boolean) => {
  const handleGetTransaction = async () => {
    try {
      const data = await getTransactionDetail(id);

      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const useFetchTransaction: any = useQuery({
    queryKey: ['getTransaction', id],
    queryFn: () => handleGetTransaction(),
    refetchOnWindowFocus: false,
    enabled: !!id && !!visible,
  });

  const { isLoading, isError } = useFetchTransaction;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchTransaction.data,
  };
};

// get list revenue
const { DEFAULT, CREATED_AT, NFT_ID, NFT_NAME, QUANTITY, UNIT_PRICE, SUB_TOTAL, REVENUE } =
  REVENUE_MANAGEMENT_FIELD_SORTER;
const { ASC, DESC, FIELD, ORDER } = ORDERS;
const { FROM, UNTIL, SORT } = REVENUE_MANAGEMENT_FIELD;

export const useGetListRevenues = (params?: any) => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const INDEXED_SORTER = {
    [DEFAULT]: { [CREATED_AT]: DESC },
    [CREATED_AT]: { [CREATED_AT]: DESC },
    [NFT_ID]: { [NFT_ID]: ASC, [CREATED_AT]: DESC },
    [NFT_NAME]: { [NFT_NAME]: ASC, [CREATED_AT]: DESC },
    [QUANTITY]: { [QUANTITY]: ASC, [CREATED_AT]: DESC },
    [UNIT_PRICE]: { [UNIT_PRICE]: ASC, [CREATED_AT]: DESC },
    [SUB_TOTAL]: { [SUB_TOTAL]: ASC, [CREATED_AT]: DESC },
    [REVENUE]: { [REVENUE]: ASC, [CREATED_AT]: DESC },
  };

  const newParams = omit({ ...params }, [FIELD, ORDER]) as any;
  newParams.from = getStartDateTimestamp(params?.[FROM]);
  newParams.until = getEndDateTimestamp(params?.[UNTIL]);
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
  const handleGetListRevenues = async () => {
    try {
      const response = await getTransactions(newParams);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListRevenues: any = useQuery({
    queryKey: ['getListRevenues', newParams, address],
    queryFn: () => handleGetListRevenues(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading } = useFetchListRevenues;

  return {
    loading: isLoading,
    data: useFetchListRevenues.data,
  };
};

export const useGetExportRevenues = (params?: any, visible?: boolean, exportData?: boolean) => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const newParams = { ...params } as any;
  newParams.from = params?.[FROM] && getStartDateTimestamp(params?.[FROM].startOf(params?.[FROM]));
  newParams.until = params?.[UNTIL] && getEndDateTimestamp(params?.[UNTIL].endOf(params?.[UNTIL]));

  for (const key in newParams) {
    if (!newParams[key]) {
      delete newParams[key];
    }
  }

  const handleExportRevenue = async () => {
    try {
      const response = await getTransactions(newParams);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchExportRevenue: any = useQuery({
    queryKey: ['getExportRevenue', newParams, address],
    queryFn: () => handleExportRevenue(),
    refetchOnWindowFocus: false,
    enabled: !!newParams && !!visible && !!exportData,
  });

  const { isLoading, isSuccess } = useFetchExportRevenue;

  return {
    loadingExport: isLoading,
    successExport: isSuccess,
    dataExport: useFetchExportRevenue.data,
  };
};
