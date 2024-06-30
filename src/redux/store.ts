import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { namespace as AddressNamespace } from './address/slice';
import { namespace as AuthenticationNamespace } from './authentication/slice';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [AddressNamespace, AuthenticationNamespace],
  blacklist: [],
};

const root = persistReducer(persistConfig, rootReducer);
export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: root,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store, {});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
