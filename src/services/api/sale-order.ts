import { api } from '..';

export async function getSaleOrders(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/sale-orders',
    params: params,
    options: options,
  });
}

export async function createSaleOrders(
  body: API.CreateSaleOrder,
  options?: { [key: string]: any },
) {
  return api.post<any>({
    endpoint: '/api/admin/sale-orders',
    body: body,
    options: options,
  });
}
