import { formatCurrency, getNumber } from '@/utils/utils';
import CoinIcon from '@/resources/images/coin_icon.png';
import styleLess from './index.less';
export const SellDetailItem = (
  dataRevenue: any,
  priceUsd?: number,
  subTotal?: number,
  subTotalUsd?: number,
) => [
  {
    label: 'revenue.management.price',
    value: formatCurrency(getNumber(dataRevenue?.saleOrder?.unitPrice), { isNotCompare: true }),
    prefixIcon: CoinIcon,
    currency: dataRevenue?.saleOrder?.currency?.symbol,
    usd: formatCurrency(priceUsd),
  },
  {
    label: 'revenue.management.subtotal',
    value: formatCurrency(getNumber(subTotal), { isNotCompare: true }),
    prefixIcon: CoinIcon,
    currency: dataRevenue?.saleOrder?.currency?.symbol,
    usd: formatCurrency(subTotalUsd),
    className: styleLess.revenue_modal__line_sale,
  },
  {
    label: 'revenue.management.seller',
    address: dataRevenue?.fromAddress,
    isAdmin: true,
  },
  {
    label: 'revenue.management.buyer',
    address: dataRevenue?.toAddress,
  },
];

export const ResellDetailItem = (
  dataRevenue: any,
  priceUsd?: number,
  subTotal?: number,
  subTotalUsd?: number,
) => [
  {
    label: 'revenue.management.price',
    value: formatCurrency(getNumber(dataRevenue?.saleOrder?.unitPrice), { isNotCompare: true }),
    prefixIcon: CoinIcon,
    currency: dataRevenue?.saleOrder?.currency?.symbol,
    usd: formatCurrency(priceUsd),
  },
  {
    label: 'revenue.management.subtotal',
    value: formatCurrency(subTotal, { isNotCompare: true }),
    prefixIcon: CoinIcon,
    currency: dataRevenue?.saleOrder?.currency?.symbol,
    usd: formatCurrency(subTotalUsd),
  },
  {
    label: 'revenue.management.royalties',
    royalties: getNumber(dataRevenue?.nft?.royaltyFee),
    value: formatCurrency(getNumber(dataRevenue?.revenue), { isNotCompare: true }),
    prefixIcon: CoinIcon,
    currency: dataRevenue?.saleOrder?.currency?.symbol,
    usd: formatCurrency(getNumber(dataRevenue?.revenueUsd)),
    className: styleLess.revenue_modal__line_sale,
  },
  {
    label: 'revenue.management.token.id',
    address: dataRevenue?.saleOrder?.tokenId,
    noShort: true,
  },
  {
    label: 'revenue.management.seller',
    address: dataRevenue?.fromAddress,
  },
  {
    label: 'revenue.management.buyer',
    address: dataRevenue?.toAddress,
  },
];
