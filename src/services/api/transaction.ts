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
