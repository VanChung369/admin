import { getAnalytics, getOverview, getTopNfts, getTransactions } from '@/services/api/transaction';
import { useQuery } from '@tanstack/react-query';
import { DASHBOARD_NULL_ANALYTICS } from '../constants';

export const useGetAnalytics = (params?: any) => {
  const handleGetAnalytics = async () => {
    try {
      const data = await getAnalytics(params);

      return data.length > 0 ? data : DASHBOARD_NULL_ANALYTICS;
    } catch (error) {
      throw error;
    }
  };

  const useFetchAnalytics: any = useQuery({
    queryKey: ['getAnalytics', params],
    queryFn: () => handleGetAnalytics(),
    refetchOnWindowFocus: false,
    enabled: !!params,
  });

  const { isLoading, isError } = useFetchAnalytics;

  return {
    loading: isLoading,
    error: isError,
    saleAnalytics: useFetchAnalytics.data,
  };
};

export const useGetOverview = (params?: any) => {
  const handleGetOverview = async () => {
    try {
      const data = await getOverview(params);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const useFetchOverview: any = useQuery({
    queryKey: ['getOverview', params],
    queryFn: () => handleGetOverview(),
    refetchOnWindowFocus: false,
    enabled: !!params,
  });

  const { isLoading, isError } = useFetchOverview;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchOverview.data,
  };
};

export const useGetTransactions = () => {
  const handleGetTransactions = async () => {
    try {
      const data = await getTransactions();

      return data;
    } catch (error) {
      throw error;
    }
  };

  const useFetchTransactions: any = useQuery({
    queryKey: ['getTransactions'],
    queryFn: () => handleGetTransactions(),
    refetchOnWindowFocus: false,
  });

  const { isLoading, isError } = useFetchTransactions;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchTransactions.data,
  };
};

export const useGetTopNFTs = (params?: any) => {
  const handleGetTopNFTs = async () => {
    try {
      const data = await getTopNfts(params);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const useFetchTopNFTs: any = useQuery({
    queryKey: ['getTopNFTs'],
    queryFn: () => handleGetTopNFTs(),
    refetchOnWindowFocus: false,
  });

  const { isLoading, isError } = useFetchTopNFTs;

  return {
    loading: isLoading,
    error: isError,
    data: useFetchTopNFTs.data,
  };
};
