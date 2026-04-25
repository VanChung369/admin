import { useEffect } from 'react';
import useAppDispatch from './useAppDispatch';
import { getConfig } from '@/services/api/config';
import { handleSetConfig } from '@/redux/config/slice';

export function useGetAppConfig() {
  const dispatch = useAppDispatch();

  const handleGetConfig = async () => {
    try {
      const response = await getConfig();

      dispatch(handleSetConfig(response));
    } catch (error) {}
  };

  useEffect(() => {
    handleGetConfig();
  }, []);
}
