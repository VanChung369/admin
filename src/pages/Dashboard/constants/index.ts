import { CURRENCY } from '@/pages/Revenue/constants';

export const DASHBOARD_CURRENCY = [
  {
    name: CURRENCY,
    value: CURRENCY,
  },
  {
    name: 'USD',
    value: 'usd',
  },
];

export const DASHBOARD_DATA_TYPES = [
  {
    name: 'dashboard.volume',
    value: 'volume',
  },
  {
    name: 'dashboard.revenue',
    value: 'revenue',
  },
];

export const DASHBOARD_SALE_ANALYTICS = {
  CURRENCY: 'currency',
  DATA_TYPE: 'dataType',
  TIME_TYPE: 'timeType',
};

export const DASHBOARD_OVERVIEW = {
  TIME_TYPE: 'timeType',
};

export const DASHBOARD_TIME_TYPES = [
  { name: 'dashboard.all.time', value: 'all-time' },
  { name: 'dashboard.today', value: 'day' },
  { name: 'dashboard.this.week', value: 'week' },
  { name: 'dashboard.this.month', value: 'month' },
  { name: 'dashboard.this.quarter', value: 'quarter' },
  { name: 'dashboard.this.year', value: 'year' },
];

export const DASHBOARD_TIME_FORMAT = {
  HOUR: 'HH',
  YEAR: 'YYYY',
  MONTH_DAY: 'MMM DD',
  MONTH_YEAR: 'MMM YYYY',
  TOOLTIP: 'MMM DD YYYY, HH:mm',
};

export const DASHBOARD_TOP_NFTS_SORT = {
  TOTAL_VOLUME: 'sort[totalVolume]',
  DESC: 'desc',
};

export const DASHBOARD_NULL_ANALYTICS = [
  {
    _id: Date.now(),
    totalRevenue: '0',
    totalRevenueUsd: '0',
    totalVolume: '0',
    totalVolumeUsd: '0',
  },
  {
    _id: '2024-10-03T08:00:00.000Z',
    totalRevenue: 0,
    totalRevenueUsd: 0,
    totalVolume: 0,
    totalVolumeUsd: 0,
  },
  {
    _id: '2024-12-30T20:00:00.000Z',
    totalRevenue: 0,
    totalRevenueUsd: 0,
    totalVolume: 0,
    totalVolumeUsd: 0,
  },
  {
    _id: '2025-01-24T08:00:00.000Z',
    totalRevenue: 0,
    totalRevenueUsd: 0,
    totalVolume: 0,
    totalVolumeUsd: 0,
  },
];
