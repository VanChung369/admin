import { FC, lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { namespace as AuthenticationNamespace } from '@/redux/authentication/slice';
import { PolygonAmoyTestnet } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { setTokenCallApi } from '@/utils/api';
import { persistor, store } from '@/redux/store';
import ConnectWalletWrapper from '../ConnectWallet';

const queryClient = new QueryClient();
const isDev = process.env.NODE_ENV === 'development';
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

const AppProvider: FC<{
  children: any;
  initialIsOpen?: boolean;
}> = ({ children, initialIsOpen = true }) => {
  const onBeforeLift: any = (store: any) => () => {
    const state = store.getState();
    setTokenCallApi(state?.[AuthenticationNamespace]?.authenticationToken);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {isDev && initialIsOpen ? (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      ) : null}
      <ThirdwebProvider
        autoConnect={true}
        clientId={process.env.UMI_APP_PUBLIC_TEMPLATE_CLIENT_ID!}
        activeChain={PolygonAmoyTestnet}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift(store)}>
            <ConnectWalletWrapper>{children}</ConnectWalletWrapper>
          </PersistGate>
        </Provider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
