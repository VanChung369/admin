export const SALE_ORDER_MANAGEMENT_FIELD = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  METHOD: 'method',
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
};

export const SALE_ORDER_MANAGEMENT_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  SOLD: 'sold',
  QUANTITY: 'quantity',
  REMAIN: 'remain',
  UNIT_PRICE: 'unitPrice',
};

export const SALE_ORDER_MANAGEMENT_COLUMN = {
  NO: 'no',
  FROM_ADDRESS: 'fromAddress',
  SOLD: 'sold',
  NFT: 'nft',
  QUANTITY: 'quantity',
  REMAIN: 'remain',
  SALE_METHOD: 'method',
  UNIT_PRICE: 'unitPrice',
  SALE_STATUS: 'status',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  CREATED_AT: 'createdAt',
  ACTIONS: 'actions',
};

export const SALE_ORDER_STATUS = [
  {
    name: 'sale.order.management.sold.out',
    value: 'sold-out',
    color: 'red',
  },
  {
    name: 'sale.order.management.listed',
    value: 'listed',
    color: 'green',
  },
  {
    name: 'sale.order.management.delisted',
    value: 'delisted',
    color: 'magenta',
  },
  {
    name: 'sale.order.management.coming.soon',
    value: 'coming-soon',
    color: 'gold',
  },
];

export const SALE_ORDER_METHOD = [
  {
    name: 'sale.order.management.instant.sale',
    value: 1,
    color: 'cyan',
  },
  {
    name: 'sale.order.management.timed.auction',
    value: 2,
    color: 'blue',
  },
];

export const SALE_ORDER_CREATE_FIELD = {
  QUANTITY: 'quantity',
  UNIT_PRICE: 'unitPrice',
  CURRENCY: 'currency',
  METHOD: 'method',
  NFT_ID: 'nftID',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
};

export const SALE_ORDER_CREATE_METHOD = [
  {
    title: 'sale.order.management.instant.sale',
    description: 'sale.order.create.instant.sale.description',
    value: 1,
  },
  {
    title: 'sale.order.management.timed.auction',
    description: 'sale.order.create.timed.auction.description',
    value: 2,
  },
];
