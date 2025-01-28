export const TAG_MANAGEMENT_FIELD = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
};

export const TAG_MANAGEMENT_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  QUANTITY: 'itemQuantity',
};

export const TAG_MANAGEMENT_COLUMN = {
  NO: 'no',
  CREATOR_ADDRESS: 'creatorAddress',
  ICON: 'icon',
  NAME: 'name',
  ITEM_QUANTITY: 'itemQuantity',
  TAG_STATUS: 'status',
  CREATED_AT: 'createdAt',
  ACTIONS: 'actions',
};

export const TAG_STATUS = [
  {
    name: 'tag.management.status.off',
    value: 'off',
    color: 'red',
  },
  {
    name: 'tag.management.status.on',
    value: 'on',
    color: 'green',
  },
];

export const TAG_CREATE_FIELD = {
  FILE: 'file',
  FILE_PREVIEW: 'filePreview',
  NAME: 'name',
  STATUS: 'status',
  ITEM_QUANTITY: 'itemQuantity',
  IMAGE_MEDIUM: 'imageMedium',
  IMAGE_SMALL: 'imageSmall',
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

export const SALE_ORDER_TYLE = [
  {
    name: 'sale.order.detail.sell',
    value: 'sell',
    color: 'red',
  },
  {
    name: 'sale.order.detail.resell',
    value: 'resell',
    color: 'green',
  },
];
