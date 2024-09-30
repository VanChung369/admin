import ShortenAddress from '@/components/ShortenAddress';
import { TYPE_INPUT } from '@/constants/input';
import { formatCurrency, formatText, getNumber } from '@/utils/utils';
import React from 'react';

export const columns = (intl: any, data: any, nftStandard?: string) => [
  {
    label: intl.formatMessage({ id: 'NFT.detail.supply' }),
    value: data?.token?.totalSupply,
    type: TYPE_INPUT.NUMBER,
    helpText: intl.formatMessage({ id: 'NFT.detail.supply.tooltip' }),
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.minted' }),
    value: data?.token?.totalMinted,
    type: TYPE_INPUT.NUMBER,
    helpText: intl.formatMessage({ id: 'NFT.detail.minted.tooltip' }),
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.quantity' }),
    value: getNumber(data?.saleOrder?.quantity),
    type: TYPE_INPUT.NUMBER,
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.price' }),
    value: data?.saleOrder?.unitPrice
      ? formatCurrency(getNumber(data?.saleOrder?.unitPrice), { isNotCompare: true })
      : undefined,
    type: TYPE_INPUT.NUMBER,
    prefix: data?.saleOrder?.currency?.symbol,
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.id' }),
    value: formatText(data?.code),
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.standard' }),
    value: nftStandard && intl.formatMessage({ id: nftStandard }),
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.contract.address' }),
    value: <ShortenAddress address={data?.token?.address} isCopy={true} />,
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.royalties' }),
    value: `${data?.royaltyFee}%`,
    helpText: intl.formatMessage({ id: 'NFT.detail.royalties.tooltip' }),
  },
];
