import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { namespace as AuthenticationNamespace } from '@/redux/authentication/slice';
import { PolygonAmoyTestnet } from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { setTokenCallApi } from '@/utils/api';
import { persistor, store } from '@/redux/store';
import ConnectWalletWrapper from '../ConnectWallet';

const AppProvider: FC<{
  children: any;
}> = ({ children }) => {
  const onBeforeLift: any = (store: any) => () => {
    const state = store.getState();
    setTokenCallApi(state?.[AuthenticationNamespace]?.authenticationToken);
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
