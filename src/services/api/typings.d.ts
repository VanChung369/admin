// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    role?: string;
    status?: string;
    createdAt?: string;
    access?: string;
    address?: string;
    avatar?: string;
    notifyCount?: number;
    unreadCount?: number;
  };

  type LoginResult = {
    address?: string;
    token?: string;
    refreshToken?: string;
    role?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    signature: string;
    address: string;
  };

  type RefreshTokenParams = {
    refreshToken: string;
  };

  type ErrorResponse = {
    errorCode: string;
    errorMessage?: string;
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type Config = {
    id?: string;
    attributes?: any;
    currencies?: any;
    ipfsGateway: string;
    isMaintenance: boolean;
    mintingQuantityMax: number;
    userMintingQuantityMax: number;
  };

  type CreateNFT = {
    file?: any;
    filePreview?: any;
    name?: string;
    royaltyFee?: number;
    totalSupply?: number;
    description?: string;
    isPutOnSale?: boolean;
    quantity?: number;
    unitPrice?: number;
    currency?: any;
    imageMedium?: any;
    imageSmall?: any;
  };

  type EditNFT = {
    file?: any;
    filePreview?: any;
    name?: string;
    royaltyFee?: number;
    totalSupply?: number;
    description?: string;
    isPutOnSale?: boolean;
    quantity?: number;
    unitPrice?: number;
    currency?: any;
    imageMedium?: any;
    imageSmall?: any;
  };
}
