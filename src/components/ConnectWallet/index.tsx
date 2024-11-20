import { SUPPORTED_CHAIN_IDS } from '@/constants/connect';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useConnectWallet } from '@/hooks/hook-customs/useConnectWallet';
import { useGetAppConfig } from '@/hooks/hook-customs/useGetAppConfig';
import selectedAddress from '@/redux/address/selector';
import {
  handleAddAddressNetWork,
  handleRemoveAddressNetwork,
  handleSetAddressNetwork,
} from '@/redux/address/slice';
import selectAuthentication from '@/redux/authentication/selector';
import { handleSetAuthenticationToken } from '@/redux/authentication/slice';
import { handleSetLoadingMetamask, handleSetWrongNetwork } from '@/redux/connection/slice';
import { setTokenCallApi } from '@/utils/api';
import {
  useAddress,
  useChainId,
  useConnectionStatus,
  useDisconnect,
  useSigner,
} from '@thirdweb-dev/react';
import { FC, Fragment, useEffect } from 'react';
import formatMessage from '../FormatMessage';
import { useLogin } from '@/pages/User/Login/hooks';
import ModalWrongNetwork from '../ModalWrongNetwork';
import ModalConnectWallet from '../ModalConnectWallet';
import { useModel, history } from '@umijs/max';
import { flushSync } from 'react-dom';
import ROUTES_PATH from '@/constants/routesPath';
import selectedConnection from '@/redux/connection/selector';
import MetamaskService from '@/services/blockchain';

const ConnectWalletWrapper: FC<{
  children: any;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const connectionStatus = useConnectionStatus();
  const chainId = useChainId();
  const account = useAddress();
  const signer = useSigner();
  const disconnectWallet = useDisconnect();
  const { handleConnect } = useConnectWallet();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { onLogin } = useLogin();

  const { address, listAddress } = useAppSelector(selectedAddress.getAddress);
  const { authenticationToken } = useAppSelector(selectAuthentication.getAuthenticationToken);
  const { isConnectingWallet } = useAppSelector(selectedConnection.getConnection);

  useGetAppConfig();

  useEffect(() => {
    if (authenticationToken && connectionStatus === 'disconnected') {
      handleConnect();
    }

    if (
      (!authenticationToken && connectionStatus === 'disconnected') ||
      (authenticationToken && !initialState?.currentUser)
    ) {
      handleDisconnect();
    }
  }, [initialState?.currentUser, connectionStatus]);

  useEffect(() => {
    const isWrongNetwork = authenticationToken && chainId && !SUPPORTED_CHAIN_IDS.includes(chainId);
    dispatch(handleSetWrongNetwork(isWrongNetwork));

    if (!isWrongNetwork)
      dispatch(
        handleSetAddressNetwork({
          chainId,
          address: address,
        }),
      );
  }, [authenticationToken, chainId]);

  useEffect(() => {
    const setUpAddress = async () => {
      if (account) {
        const wallet = new MetamaskService().getInstance();
        const isAdmin = await handleCheckIsAdmin(wallet);

        if (isAdmin) {
          if (!listAddress?.[account]) {
            handleLoginForFirstTime(wallet);
          } else {
            handleLoginWithExistedAccount(account);
          }
        }
      }
    };

    if (account !== address || !address || !initialState?.currentUser) {
      setUpAddress();
    }
  }, [account]);

  const handleCheckIsAdmin = async (wallet: MetamaskService) => {
    const isAdmin = await wallet.isAdmin(account as string);
    if (!isAdmin) {
      handleCancelLoadingMetamask();
      handleLoginFailed();
    }
    return isAdmin;
  };

  const handleCancelLoadingMetamask = () =>
    setTimeout(() => {
      dispatch(handleSetLoadingMetamask(false));
    }, 1000);

  const handleDisconnect = () => {
    disconnectWallet();
    dispatch(handleRemoveAddressNetwork({ account }));
    dispatch(handleSetAddressNetwork({}));
    dispatch(handleSetAuthenticationToken({}));
    setTokenCallApi('');
    history.push(ROUTES_PATH.LOGIN);
  };

  const handleLoginFailed = () => {
    handleDisconnect();
    formatMessage({
      descriptor: { id: 'codeMessage.E2' },
      type: 'error',
    });
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }

    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
  };

  const handleLoginForFirstTime = async (wallet: MetamaskService) => {
    const signature = (await wallet.verifyLoginSignature({
      signer,
      creator: account as string,
      cancelMetamask: () => {
        handleDisconnect();
        handleCancelLoadingMetamask();
      },
    })) as string;

    if (signature) {
      await handleLogin({
        address: account as string,
        signature,
        success: async () => {
          dispatch(
            handleAddAddressNetWork({
              address: account,
              signature,
            }),
          );
          dispatch(
            handleSetAddressNetwork({
              chainId,
              address: account,
            }),
          );
          await fetchUserInfo();
        },
        fail: handleLoginFailed,
      });
    }
  };

  const handleLoginWithExistedAccount = async (account: string) => {
    handleLogin({
      address: account as string,
      signature: listAddress?.[account]?.signature as string,
      success: async () => {
        dispatch(
          handleSetAddressNetwork({
            chainId,
            address: account,
          }),
        );
        await fetchUserInfo();
      },
      fail: handleLoginFailed,
    });
  };

  const handleLogin = async ({
    address,
    signature,
    success,
    fail,
  }: {
    address: string;
    signature: string;
    success: () => void;
    fail: () => void;
  }) => {
    const data = {
      address,
      signature,
    };

    try {
      onLogin({ data: data, onSuccess: success, onError: fail });
    } catch (error) {
    } finally {
      handleCancelLoadingMetamask();
    }
  };

  return (
    <Fragment>
      {children}
      <ModalWrongNetwork />
      <ModalConnectWallet />
    </Fragment>
  );
};

export default ConnectWalletWrapper;
