import { createNFT, getNfts } from '@/services/api/nft';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NFT_MANAGEMENT_FIELD, NFT_MANAGEMENT_FIELD_SORTER } from '../constants';
import { ORDERS } from '@/constants';
import { useAppSelector } from '@/hooks';
import selectedAddress from '@/redux/address/selector';
import { omit } from 'lodash';

// create or update nft
export interface paramCreateNFT {
  data: any;
  onSuccess: (id: any) => void;
  onError: () => void;
}

export const useCreateOrUpdateNFT = () => {
  const handleCreateNFT = useMutation({
    mutationFn: async (params: paramCreateNFT) => {
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

  return {
    loading: handleCreateNFT.isPending,
    onCreateNFT: handleCreateNFT.mutate,
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
