import { AvatarDropdown, AvatarName, Question, SelectLang } from '@/layouts';
import { currentUser as queryCurrentUser } from '@/services/api/user';
import { PageLoading, SettingDrawer, Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { default as Page403 } from './pages/exception/403';
import { default as Page404 } from './pages/exception/404';
import { errorConfig } from './utils/requestErrorConfig';
import AppProvider from './components/AppProvider';
import { HEADERS } from './constants/api';
import LocalStore from './utils/store';
import ROUTES_PATH from './constants/routesPath';
import React from 'react';

const isDev = process.env.NODE_ENV === 'development';
const localStoreAuth: any = LocalStore.getValue('persist:root');
const authenticationToken = localStoreAuth?.AuthenticationSlice
  ? JSON.parse(localStoreAuth.AuthenticationSlice)?.authenticationToken
  : '';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const headers = authenticationToken
      ? { ...HEADERS, Authorization: `Bearer ${authenticationToken} ` }
      : { ...HEADERS };

    try {
      const data = await queryCurrentUser(
        {
          skipErrorHandler: true,
        },
        {
          ...headers,
        },
      );

      return data;
    } catch (error) {
      history.push(ROUTES_PATH.LOGIN);
    }
    return undefined;
  };

  const { location } = history;
  if (location.pathname !== ROUTES_PATH.LOGIN) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    unAccessible: <Page403 />,
    noFound: <Page404 />,
    avatarProps: {
      src: initialState?.currentUser?.avatar
        ? initialState.currentUser.avatar
        : `${process.env.UMI_APP_PUBLIC_DOMAIN_ADMIN}/images/no-profile-md.png`,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: '',
    },
    footerRender: false,
    className: 'app',
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== ROUTES_PATH.LOGIN) {
        history.push(ROUTES_PATH.LOGIN);
      }
    },
    layoutBgImgList: [],
    menuHeaderRender: undefined,

    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;

      return (
        <AppProvider initialIsOpen={true}>
          {children}

          {!isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </AppProvider>
      );
    },
    ...initialState?.settings,
  };
};

export const request = {
  ...errorConfig,
};
