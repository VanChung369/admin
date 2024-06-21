// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function getInventory(options?: { [key: string]: any }) {
  return api.get<Record<string, any>>({ endpoint: '/store/inventory', options: options });
}

export async function placeOrder(body: API.Order, options?: { [key: string]: any }) {
  return api.post<API.Order>({ endpoint: '/store/order', body: body, options: options });
}

export async function getOrderById(
  params: API.getOrderByIdParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return api.get<API.Order>({
    endpoint: `/store/order/${param0}`,
    params: queryParams,
    options: options,
  });
}

export async function deleteOrder(params: API.deleteOrderParams, options?: { [key: string]: any }) {
  const { orderId: param0, ...queryParams } = params;
  return api.delete<any>({
    endpoint: `/store/order/${param0}`,
    params: queryParams,
    options: options,
  });
}
