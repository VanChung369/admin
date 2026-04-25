export const EXTERNAL_URL = {
  POLYGON_SCAN: 'https://amoy.polygonscan.com/tx',
  POLYGON_SCAN_ADDRESS: 'https://amoy.polygonscan.com/address',
  POLYGON_SCAN_TOKEN: 'https://amoy.polygonscan.com/token',
};

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

const ROUTES_PATH = {
  LOGIN: '/user/login',
  DASHBOARD: '/dashboard',
  NFT: '/nft',
  NFT_DETAIL: '/nft/detail',
  NFT_EDITION: '/nft/edit',
  NFT_CREATION: '/nft/create',
  SALE: '/sales',
  SALE_DETAIL: '/sales/detail',
  SALE_EDITION: '/sales/edit',
  SALE_CREATION: '/sales/create',
  REVENUE: '/revenue',
  COLLECTION: '/collection',
  TAG: '/tag',
  MARKET_NFT_DETAIL: `${getPublicDomain()}/nft`,
};

export default ROUTES_PATH;
