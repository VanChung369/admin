import { api } from '..';

export async function createTransactions(body?: any) {
  return api.post<any>({
    endpoint: '/api/transactions',
    body: body,
  });
}

export async function updateTransactions(id: string, body?: any) {
  return api.patch<any>({
    endpoint: `/api/transactions/${id}`,
    body: body,
  });
}

export async function getTransactions(params?: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/transactions',
    params: params,
    options: options,
  });
}

export async function getTransactionDetail(
  id?: string,
  options?: { [key: string]: any },
): Promise<Record<string, any>> {
  return api.get<Record<string, any>>({
    endpoint: `/api/admin/transactions/${id}`,
    options: options,
  });
}

export async function getAnalytics(params: any, options?: { [key: string]: any }) {
  return api.get<Record<string, any>>({
    endpoint: '/api/admin/transactions/sale-analytics',
    params: params,
    options: options,
  });
}

export async function getOverview(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/transactions/overview',
    params: params,
    options: options,
  });
}

export async function getTopNfts(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/transactions/best-selling-nfts',
    params: params,
    options: options,
  });
}
