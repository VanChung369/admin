import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { TAG_MANAGEMENT_FIELD, TAG_MANAGEMENT_FIELD_SORTER } from '../constants';
import { ORDERS } from '@/constants';
import { omit } from 'lodash';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTag, editTag, getTag, getTags } from '@/services/api/tag';

const { DEFAULT, CREATED_AT, QUANTITY } = TAG_MANAGEMENT_FIELD_SORTER;
const { ASC, DESC, FIELD, ORDER } = ORDERS;
const { SORT } = TAG_MANAGEMENT_FIELD;

export const useGetListTags = (params: any) => {
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
  const handleGetListTags = async () => {
    try {
      const response = await getTags(newParams);

      return response;
    } catch (error) {
      throw error;
    }
  };

  const useFetchListTags: any = useQuery({
    queryKey: ['getListTags', newParams, address],
    queryFn: () => handleGetListTags(),
    refetchOnWindowFocus: false,
    enabled: !!newParams,
  });

  const { isLoading } = useFetchListTags;

  return {
    loading: isLoading,
    data: useFetchListTags.data,
  };
};

export interface paramCreateOrUpdateTag {
  data: any;
  onSuccess: (id?: any) => void;
  onError: () => void;
}

export const useCreateOrUpdateTag = (id?: string) => {
  const handleCreateTag = useMutation({
    mutationFn: async (params: paramCreateOrUpdateTag) => {
      try {
        const response = await createTag(params.data);
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

  const handleEditTag = useMutation({
    mutationFn: async (params: paramCreateOrUpdateTag) => {
      try {
        const response = await editTag(id, params.data);
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
    loading: handleCreateTag.isPending,
    loadingEditTag: handleEditTag.isPending,
    onCreateTag: handleCreateTag.mutate,
    onEditTag: handleEditTag.mutate,
  };
};

export const useGetTag = (id?: string, visible?: boolean) => {
  const handleGetTag = async () => {
    try {
      const data = await getTag(id);

      return data[0];
    } catch (error) {
      throw error;
    }
  };

  const useFetchTag: any = useQuery({
    queryKey: ['getTag', id],
    queryFn: () => handleGetTag(),
    refetchOnWindowFocus: false,
    enabled: !!id && !!visible,
  });

  const { isLoading, isError } = useFetchTag;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchTag.data,
  };
};
