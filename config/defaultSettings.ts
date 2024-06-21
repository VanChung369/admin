import { ProLayoutProps } from '@ant-design/pro-components';

export interface Config {
  BASENAME?: string;

  SUCCESS_CODE?: number;

  LOGIN_EXPIRE?: number;

  API_URL?: string;

  TOKEN_KEY: string;
}

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} & Config = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {},
  BASENAME: '',
  SUCCESS_CODE: 200,
  LOGIN_EXPIRE: 400,
  API_URL: '',
  TOKEN_KEY: 'token_key',
};

export default Settings;
