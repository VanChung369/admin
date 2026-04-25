import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
} = {
  navTheme: 'realDark',
  colorPrimary: '#A259FF',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'NFT Treasure',
  pwa: true,
  logo: `${process.env.UMI_APP_PUBLIC_DOMAIN_ADMIN}/logo.png`,
  iconfontUrl: '',
};

export default Settings;
