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

export const NFT_ZERO_ID = '#0000';

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

export const MIN_VALUE_TOTAL_SUPPLY = 1;
export const MAX_VALUE_TOTAL_SUPPLY = 10000;
export const MAX_VALUE_ROYALTY_FEE = 50;
export const MAX_LENGTH_DESCRIPTION = 3000;
