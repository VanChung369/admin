export const COLLECTION_MANAGEMENT_FIELD = {
  KEYWORD: 'keyword',
  STATUS: 'status',
  STANDARD: 'standard',
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
};

export const COLLECTION_MANAGEMENT_FIELD_SORTER = {
  DEFAULT: 'default',
  CREATED_AT: 'createdAt',
  QUANTITY: 'itemQuantity',
};

export const COLLECTION_MANAGEMENT_COLUMN = {
  NO: 'no',
  CREATOR_ADDRESS: 'creatorAddress',
  NAME: 'name',
  ITEM_QUANTITY: 'itemQuantity',
  COLLECTION_STATUS: 'status',
  STANDARD: 'standard',
  CREATED_AT: 'createdAt',
  ACTIONS: 'actions',
};

export const COLLECTION_STATUS = [
  {
    name: 'collection.management.status.off',
    value: 'off',
    color: 'red',
  },
  {
    name: 'collection.management.status.on',
    value: 'on',
    color: 'green',
  },
];

export const COLLECTION_STANDARD = [
  {
    name: 'collection.management.ERC-721',
    value: 'erc-721',
  },
  {
    name: 'collection.management.ERC-1155',
    value: 'erc-1155',
  },
];

export const COLLECTION_CREATE_FIELD = {
  NAME: 'name',
  STATUS: 'status',
  ITEM_QUANTITY: 'itemQuantity',
  STANDARD: 'standard',
  PROPERTIES: 'properties',
  DESCRIPTION: 'description',
  DISPLAY: 'display',
  TYPE: 'type',
  VALUE: 'value',
  REQUIRED: 'required',
  TYPE_UESR: 'typeUser',
};

export const COLLECTION_PROPERTIES_TYPE = [
  { label: 'Text', value: 'text' },
  { label: 'Select', value: 'select' },
];
