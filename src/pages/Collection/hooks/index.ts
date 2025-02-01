import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { COLLECTION_MANAGEMENT_FIELD, COLLECTION_MANAGEMENT_FIELD_SORTER } from '../constants';
import { ORDERS } from '@/constants';
import { omit } from 'lodash';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
  createCollection,
  editCollection,
  getCollection,
  getCollections,
} from '@/services/api/collection';

const { DEFAULT, CREATED_AT, QUANTITY } = COLLECTION_MANAGEMENT_FIELD_SORTER;
const { ASC, DESC, FIELD, ORDER } = ORDERS;
const { SORT } = COLLECTION_MANAGEMENT_FIELD;

export const useGetListCollections = (params: any) => {
  const { address } = useAppSelector(selectedAddress.getAddress);

  const INDEXED_SORTER = {
    [DEFAULT]: { [CREATED_AT]: DESC },
    [CREATED_AT]: { [CREATED_AT]: DESC },
    [QUANTITY]: { [QUANTITY]: ASC, [CREATED_AT]: DESC },
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
  const handleGetListCollections = async () => {
    try {
      const response = await getCollections(newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListCollections: any = useQuery({
    queryKey: ['getListCollections', newParams, address],
    queryFn: () => handleGetListCollections(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading } = useFetchListCollections;

  return {
    loading: isLoading,
    data: useFetchListCollections.data,
  };
};

export interface paramCreateOrUpdateCollection {
  data: any;
  onSuccess: (id?: any) => void;
  onError: () => void;
}

export const useCreateOrUpdateCollection = (id?: string) => {
  const handleCreateCollection = useMutation({
    mutationFn: async (params: paramCreateOrUpdateCollection) => {
      try {
        const response = await createCollection(params.data);
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

  const handleEditCollection = useMutation({
    mutationFn: async (params: paramCreateOrUpdateCollection) => {
      try {
        const response = await editCollection(id, params.data);
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
    loading: handleCreateCollection.isPending,
    loadingEditCollection: handleEditCollection.isPending,
    onCreateCollection: handleCreateCollection.mutate,
    onEditCollection: handleEditCollection.mutate,
  };
};

export const useGetCollection = (id?: string, visible?: boolean) => {
  const handleGetCollection = async () => {
    try {
      const data = await getCollection(id);

      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const useFetchCollection: any = useQuery({
    queryKey: ['getCollection', id, visible],
    queryFn: () => handleGetCollection(),
    refetchOnWindowFocus: false,
    enabled: !!id && !!visible,
    // placeholderData: keepPreviousData,
    // staleTime: 0,
  });

  const { isLoading, isError } = useFetchCollection;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchCollection.data,
  };
};
