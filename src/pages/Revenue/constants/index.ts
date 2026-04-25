export const REVENUE_MANAGEMENT_FIELD = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
  TYPE: 'saleOrderType',
  FROM: 'from',
  UNTIL: 'until',
  STANDARD: 'tokenStandard',
  FIELD: 'field',
  ORDER: 'order',
  SELL: 'sell',
  RESELL: 'resell',
};

export const REVENUE_MANAGEMENT_COLUMN = {
  NO: 'no',
  SELLER: 'fromAddress',
  SALE_DATE: 'createdAt',
  BUYER: 'toAddress',
  TYPE: 'nft.token.standard',
  QUANTITY: 'quantity',
  NFT_ID: 'nft.id',
  PRICE: 'saleOrder.unitPrice',
  NFT_NAME: 'nft.name',
  SUBTOTAL: 'subTotal',
  ROYALTIES: 'revenue',
  TOKEN_ID: 'saleOrder.tokenId',
  ACTIONS: 'actions',
};

export const REVENUE_MANAGEMENT_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  NFT_ID: 'nft.id',
  NFT_NAME: 'nft.name',
  QUANTITY: 'quantity',
  UNIT_PRICE: 'saleOrder.unitPrice',
  SUB_TOTAL: 'subTotal',
  REVENUE: 'revenue',
};

export const REVENUE_TABS = {
  PRIMARY: {
    key: 'PRIMARY',
    label: 'revenue.management.sell',
    type: 'sell',
  },
  SECONDARY: {
    key: 'SECONDARY',
    label: 'revenue.management.resell',
    type: 'resell',
  },
};

export const REVENUE_TYPE = [
  {
    name: 'revenue.management.all',
    value: null,
  },
  {
    name: 'revenue.management.ERC-721',
    value: 'erc-721',
  },
  {
    name: 'revenue.management.ERC-1155',
    value: 'erc-1155',
  },
];
export const REVENUE_DECIMAL_SCALE = 2;
export const CURRENCY = 'UDC';
export const FORMAT_EXPORT_DATA_DATE = 'DDMMYY';
