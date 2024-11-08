import { api } from '..';

export async function getSaleOrders(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/sale-orders',
    params: params,
    options: options,
  });
}
