import { createNFT } from '@/services/api/nft';
import { useMutation } from '@tanstack/react-query';

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
