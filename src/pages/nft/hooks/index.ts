import {
  createNFT,
  deleteNFT,
  editNFT,
  getListNftOwner,
  getListNftSaleHistory,
  getNft,
  getNfts,
} from '@/services/api/nft';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  NFT_MANAGEMENT_FIELD,
  NFT_MANAGEMENT_FIELD_SORTER,
  NFT_SALE_HISTORY_FIELD_SORTER,
} from '../constants';
import { ORDERS } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { omit } from 'lodash';
import { getEndDateTimestamp, getStartDateTimestamp } from '@/utils/utils';
import { createTransactions, updateTransactions } from '@/services/api/transaction';
import { getTags } from '@/services/api/tag';
import { TAG_STATUS } from '@/pages/Tag/constants';
import { getCollections } from '@/services/api/collection';
import { COLLECTION_STATUS } from '@/pages/Collection/constants';

// create or update nft
export interface paramCreateOrUpdateNFT {
  data: any;
  onSuccess: (id?: any) => void;
  onError: () => void;
}

export const useCreateOrUpdateNFT = (id?: string) => {
  const handleCreateNFT = useMutation({
    mutationFn: async (params: paramCreateOrUpdateNFT) => {
      try {
        const response = await createNFT(params.data);
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

  const handleEditNFT = useMutation({
    mutationFn: async (params: paramCreateOrUpdateNFT) => {
      try {
        const response = await editNFT(id, params.data);
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
    loading: handleCreateNFT.isPending,
    loadingEditNFT: handleCreateNFT.isPending,
    onCreateNFT: handleCreateNFT.mutate,
    onEditNFT: handleEditNFT.mutate,
  };
};

// get list nfts

const { DEFAULT, CREATED_AT, NFT_ID, NFT_NAME, TOTAL_SUPPLY, TOTAL_MINTED, ON_SALE_QUANTITY } =
  NFT_MANAGEMENT_FIELD_SORTER;
const { ASC, DESC, FIELD, ORDER } = ORDERS;
const { SORT } = NFT_MANAGEMENT_FIELD;

export const useGetListNFTs = (params: any) => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const INDEXED_SORTER = {
    [DEFAULT]: { [CREATED_AT]: DESC },
    [CREATED_AT]: { [CREATED_AT]: DESC },
    [NFT_ID]: { [NFT_ID]: ASC, [CREATED_AT]: DESC },
    [NFT_NAME]: { [NFT_NAME]: ASC, [CREATED_AT]: DESC },
    [TOTAL_SUPPLY]: { [TOTAL_SUPPLY]: ASC, [CREATED_AT]: DESC },
    [TOTAL_MINTED]: { [TOTAL_MINTED]: ASC, [CREATED_AT]: DESC },
    [ON_SALE_QUANTITY]: { [ON_SALE_QUANTITY]: ASC, [CREATED_AT]: DESC },
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
      const response = await getNfts(newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListNFTs: any = useQuery({
    queryKey: ['getListNFTs', newParams, address],
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

// get nft
export const useGetNFT = (id?: string) => {
  const handleGetNFT = async () => {
    try {
      const data = await getNft(id);

      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const useFetchNFT: any = useQuery({
    queryKey: ['getNFT', id],
    queryFn: () => handleGetNFT(),
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const { isLoading, isError } = useFetchNFT;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchNFT.data,
  };
};

// detele nft

export interface paramDeleteNFT {
  id?: string;
  onSuccess: (id: any) => void;
  onError: () => void;
}

export const useDeleteNFT = () => {
  const handleDeleteNFT = useMutation({
    mutationFn: async (params: paramDeleteNFT) => {
      try {
        const response = await deleteNFT(params.id);
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
    loading: handleDeleteNFT.isPending,
    onDeleteNFT: handleDeleteNFT.mutate,
  };
};

export const useGetListNFTOwner = (id: string, params?: any) => {
  const newParams = omit({ ...params });

  for (const key in newParams) {
    if (!newParams[key]) {
      delete newParams[key];
    }
  }

  const handleGetListNFTOwner = async () => {
    try {
      const response = await getListNftOwner(id, newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListNFTOwner: any = useQuery({
    queryKey: ['getListNFTOwner', newParams],
    queryFn: () => handleGetListNFTOwner(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading, isError } = useFetchListNFTOwner;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchListNFTOwner.data,
  };
};

const { QUANTITY, UNIT_PRICE, SALE_ORDER, REVENUE } = NFT_SALE_HISTORY_FIELD_SORTER;
export const useGetListNFTSaleHistory = (id: string, params?: any) => {
  const INDEXED_SORTER = {
    [NFT_SALE_HISTORY_FIELD_SORTER.DEFAULT]: { [CREATED_AT]: DESC },
    [NFT_SALE_HISTORY_FIELD_SORTER.CREATED_AT]: { [CREATED_AT]: DESC },
    [QUANTITY]: { [QUANTITY]: ASC, [CREATED_AT]: DESC },
    [UNIT_PRICE]: { [UNIT_PRICE]: ASC, [CREATED_AT]: DESC },
    [SALE_ORDER]: { [SALE_ORDER]: ASC, [CREATED_AT]: DESC },
    [REVENUE]: { [REVENUE]: ASC, [CREATED_AT]: DESC },
  };

  const newParams = omit({ ...params }, [FIELD, ORDER]) as any;
  newParams.from = getStartDateTimestamp(params?.from);
  newParams.until = getEndDateTimestamp(params?.until);
  newParams.type = params?.type;
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

  const handleGetListNFTSaleHistory = async () => {
    try {
      const response = await getListNftSaleHistory(id, newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListNFTSaleHistory: any = useQuery({
    queryKey: ['getListNFTSaleHistory', newParams],
    queryFn: () => handleGetListNFTSaleHistory(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading, isError } = useFetchListNFTSaleHistory;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchListNFTSaleHistory.data,
  };
};

// transaction

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

export const fetchDataTag = async ({ limit, offset, searchValue }: any) => {
  const param = {
    keyword: searchValue,
    page: offset,
    limit: limit,
    status: TAG_STATUS[1].value,
  };
  try {
    const response = await getTags(param);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { docs: [], totalDocs: 0 };
  }
};

export const fetchDataColleciton = async ({ limit, offset, searchValue }: any) => {
  const param = {
    keyword: searchValue,
    page: offset,
    limit: limit,
    status: COLLECTION_STATUS[1].value,
  };
  try {
    const response = await getCollections(param);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { docs: [], totalDocs: 0 };
  }
};
