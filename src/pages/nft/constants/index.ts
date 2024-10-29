export const NFT_ZERO_ID = '#0000';
export const MIN_VALUE_TOTAL_SUPPLY = 1;
export const MAX_VALUE_TOTAL_SUPPLY = 10000;
export const MAX_VALUE_ROYALTY_FEE = 50;
export const MAX_LENGTH_DESCRIPTION = 3000;

export const NFT_CREATE_FIELD = {
  FILE: 'file',
  FILE_PREVIEW: 'filePreview',
  NAME: 'name',
  ROYALTYFEE: 'royaltyFee',
  TOTAL_SUPPLY: 'totalSupply',
  DESCRIPTION: 'description',
  IS_PUT_ON_SALE: 'isPutOnSale',
  QUANTITY: 'quantity',
  UNIT_PRICE: 'unitPrice',
  CURRENCY: 'currency',
  IMAGE_MEDIUM: 'imageMedium',
  IMAGE_SMALL: 'imageSmall',
};

export const PARAMS_CONFIG = {
  TOKEN: 'token',
  SALE_ORDER: 'saleOrder',
  ATTRIBUTES: 'attributes',
};

export const NFT_ATTRIBUTE_CREATED_FIELD = {
  TYPE: 'type',
  CLASS: 'class',
  GOD: 'god',
  MYTHOLOGY: 'mythology',
  LEVEL: 'level',
};

export const NFT_CREATION_ATTRIBUTE = {
  type: {
    text: 'NFT.create.type',
    placeholder: 'NFT.create.tye.placeholder',
  },
  mythology: {
    text: 'NFT.create.mythology',
    placeholder: 'NFT.create.mythology.placeholder',
  },
  god: {
    text: 'NFT.create.god',
    placeholder: 'NFT.create.god.placeholder',
  },
  level: {
    text: 'NFT.create.level',
    placeholder: 'NFT.create.level.placeholder',
  },
  class: {
    text: 'NFT.create.class',
    placeholder: 'NFT.create.class.placeholder',
  },
} as any;

// nft manager

export const NFT_MANAGEMENT_FIELD = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
  TYPE: 'type',
};

export const NFT_TABS = {
  ERC721: {
    key: 'ERC-721',
    label: 'NFT.management.ERC-721',
    type: 'erc-721',
  },
  ERC1155: {
    key: 'ERC-1155',
    label: 'NFT.management.ERC-1155',
    type: 'erc-1155',
  },
};

export const NFT_STATUS = [
  {
    name: 'NFT.management.off.sale',
    value: 'off-sale',
    color: 'red',
  },
  {
    name: 'NFT.management.on.sale',
    value: 'on-sale',
    color: 'green',
  },
  {
    name: 'NFT.management.sold.out',
    value: 'sold-out',
    color: 'gold',
  },
];

export const NFT_MANAGEMENT_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  NFT_ID: 'code',
  NFT_NAME: 'name',
  TOTAL_SUPPLY: 'totalSupply',
  TOTAL_MINTED: 'totalMinted',
  ON_SALE_QUANTITY: 'onSaleQuantity',
};

export const NFT_MANAGEMENT_COLUMN = {
  NO: 'no',
  CREATED_AT: 'createdAt',
  NFT_ID: 'code',
  NFT_NAME: 'name',
  TOTAL_SUPPLY: 'totalSupply',
  TOTAL_MINTED: 'totalMinted',
  ON_SALE_QUANTITY: 'onSaleQuantity',
  NFT_STATUS: 'status',
  ACTIONS: 'actions',
};

// nft detail

export const NFT_PROFILE_TABS = {
  PREVIEW: {
    key: 'PREVIEW',
    label: 'NFT.detail.preview',
  },
  CONTENT: {
    key: 'CONTENT',
    label: 'NFT.detail.content',
  },
};

export const NFT_STANDARD = [
  { value: 'erc-721', key: 0, label: 'NFT.management.ERC-721' },
  { value: 'erc-1155', key: 1, label: 'NFT.management.ERC-1155' },
];

export const NFT_DETAIL_ATTRIBUTE: any = {
  mythology: {
    text: 'NFT.create.mythology',
  },
  god: {
    text: 'NFT.create.god',
  },
  level: {
    text: 'NFT.create.level',
  },
  class: {
    text: 'NFT.create.class',
  },
};

export const TABLE_CONTENT_TABS = {
  NFT_OWNER: {
    key: 'NFT_OWNER',
    label: 'NFT.detail.owner',
    type: 'nft-owner',
  },
  NFT_SALE_HISTORY: {
    key: 'NFT_SALE_HISTORY',
    label: 'NFT.detail.sale.history',
    type: 'nft-sale-history',
  },
};

export const NFT_SALE_HISTORY_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  QUANTITY: 'quantity',
  UNIT_PRICE: 'saleOrder.unitPrice',
  SALE_ORDER: 'saleOrder',
  REVENUE: 'revenue',
};

export const NFT_SALE_HISTORY_FIELD = {
  KEYWORD: 'keyword',
  FROM: 'from',
  UNTIL: 'until',
  TYPE: 'type',
  PAGE: 'page',
  LIMIT: 'limit',
  ORDER: 'order',
  SORT: 'sort',
};

export const NFT_MARKET_CHANNEL = [
  {
    name: 'NFT.all',
    value: null,
  },
  {
    name: 'NFT.detail.sale.primary',
    value: 'sell',
  },
  {
    name: 'NFT.detail.sale.secondary',
    value: 'resell',
  },
];

// mint nft

export const NFT_MINTED_FIELD = {
  QUANTITY: 'quantity',
  TO_ADDRESS: 'toAddress',
};

export const SALE_STEPS = {
  PROCESSING: 1,
  SUCCESSFUL: 2,
  FAILED: 3,
};

export const NFT_TRANSACTION_STATUS = {
  DRAFT: 'draft',
  SUCCESS: 'success',
  CANCEL: 'cancel',
  FAILED: 'failed',
};

export const NFT_TRANSACTION_TYPE = {
  LISTED: 'listed',
  DELISTED: 'delisted',
  MINTED: 'minted',
  TRANSFER: 'transfer',
  ADMIN_MINTED: 'admin-minted',
};
