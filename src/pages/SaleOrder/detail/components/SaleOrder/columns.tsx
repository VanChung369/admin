import EllipsisText from '@/components/EllipsisText';
import ShortenAddress from '@/components/ShortenAddress';
import TagWrapper from '@/components/TagWrapper';
import { TYPE_INPUT } from '@/constants/input';
import ROUTES_PATH from '@/constants/routesPath';
import { NFT_STATUS } from '@/pages/nft/constants';
import { formatCurrency, formatDate, formatText, getNumber } from '@/utils/utils';
import { Link } from '@umijs/max';
import React from 'react';
import styleLess from './index.less';
import { SALE_ORDER_METHOD, SALE_ORDER_STATUS, SALE_ORDER_TYLE } from '@/pages/SaleOrder/constants';

export const columns = (intl: any, data: any, nftStandard?: string) => [
  {
    label: intl.formatMessage({ id: 'sale.order.detail.nft.name' }),
    value: (
      <Link to={`${ROUTES_PATH.NFT_DETAIL}/${data?.nft?.id}`} target="_blank">
        <EllipsisText text={data?.nft?.name} />
      </Link>
    ),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.NFTID' }),
    value: data?.nft?.code,
    type: TYPE_INPUT.NUMBER,
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.nft.status' }),
    value: (
      <TagWrapper
        color={NFT_STATUS.find((item) => item?.value === data?.nft?.status)?.color}
        text={intl.formatMessage({
          id:
            NFT_STATUS.find((item) => item?.value === data?.nft?.status)?.name ||
            'common.null.text',
        })}
        className={styleLess.sale_detail__nft_status}
      />
    ),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.type.sale' }),
    value: (
      <TagWrapper
        color={SALE_ORDER_TYLE.find((type) => type?.value === data?.type)?.color}
        text={intl.formatMessage({
          id:
            SALE_ORDER_TYLE.find((type) => type?.value === data?.type)?.name || 'common.null.text',
        })}
      />
    ),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.selling.method' }),
    value: (
      <TagWrapper
        color={SALE_ORDER_METHOD.find((method) => method?.value === data?.method)?.color}
        text={intl.formatMessage({
          id:
            SALE_ORDER_METHOD.find((method) => method?.value === data?.method)?.name ||
            'common.null.text',
        })}
      />
    ),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.status' }),
    value: (
      <TagWrapper
        color={SALE_ORDER_STATUS.find((status) => status?.value === data?.status)?.color}
        text={intl.formatMessage({
          id:
            SALE_ORDER_STATUS.find((method) => method?.value === data?.status)?.name ||
            'common.null.text',
        })}
      />
    ),
  },
  {
    label: <EllipsisText text={intl.formatMessage({ id: 'sale.order.detail.total.supply' })} />,
    value: getNumber(data?.totalSupply),
    type: TYPE_INPUT.NUMBER,
  },

  {
    label: <EllipsisText text={intl.formatMessage({ id: 'sale.order.detail.quantity' })} />,
    value: getNumber(data?.quantity),
    type: TYPE_INPUT.NUMBER,
  },
  {
    label: <EllipsisText text={intl.formatMessage({ id: 'sale.order.detail.sold' })} />,
    value: getNumber(data?.sold),
    type: TYPE_INPUT.NUMBER,
  },
  {
    label: <EllipsisText text={intl.formatMessage({ id: 'sale.order.detail.remain' })} />,
    value: getNumber(data?.remain),
    type: TYPE_INPUT.NUMBER,
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.listing.pirce' }),
    value: data?.unitPrice
      ? formatCurrency(getNumber(data?.unitPrice), { isNotCompare: true })
      : undefined,
    type: TYPE_INPUT.NUMBER,
    prefix: data?.currency?.symbol,
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.standard' }),
    value: nftStandard && intl.formatMessage({ id: nftStandard }),
  },
  {
    label: <EllipsisText text={intl.formatMessage({ id: 'NFT.detail.contract.address' })} />,
    value: <ShortenAddress address={data?.nft?.address} isCopy={true} />,
  },
  {
    label: intl.formatMessage({ id: 'NFT.detail.royalties' }),
    value: `${data?.nft?.royaltyFee}%`,
    helpText: intl.formatMessage({ id: 'NFT.detail.royalties.tooltip' }),
  },

  {
    label: intl.formatMessage({ id: 'sale.order.detail.start.date' }),
    value: formatDate(data?.startDate),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.end.date' }),
    value: formatDate(data?.endDate),
  },
  {
    label: intl.formatMessage({ id: 'sale.order.detail.created.at' }),
    value: formatDate(data?.createdAt),
  },
];
