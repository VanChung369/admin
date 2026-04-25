import { useAppDispatch } from '@/hooks';
import { handleSetAuthenticationToken } from '@/redux/authentication/slice';
import { login } from '@/services/api/auth';
import { setTokenCallApi } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export interface paramLogin {
  data: any;
  onSuccess: () => void;
  onError: () => void;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const handleLogin = useMutation({
    mutationFn: (params: paramLogin) => login(params.data),
    onError: (_error, variables) => {
      variables.onError();
    },
    onSuccess: (data, variables) => {
      setTokenCallApi(data.token);
      dispatch(handleSetAuthenticationToken(data));
      variables.onSuccess();
    },
  });

  return {
    onLogin: handleLogin.mutate,
  };
};
