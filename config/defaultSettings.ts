import { ProLayoutProps } from '@ant-design/pro-components';

const getPublicDomain = () => {
  const publicDomain = process.env.UMI_APP_PUBLIC_DOMAIN_ADMIN || '';

  if (!publicDomain) {
    return '';
  }

  const normalizedPublicDomain = publicDomain.replace(/\/+$/, '');

  if (/^https?:\/\//i.test(normalizedPublicDomain)) {
    return normalizedPublicDomain;
  }

  return `https://${normalizedPublicDomain}`;
};

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
  logo: `${getPublicDomain()}/logo.png`,
  iconfontUrl: '',
};

export default Settings;
