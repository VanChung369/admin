import { api } from '..';

export async function createNFT(body: API.CreateNFT, options?: { [key: string]: any }) {
  return api.post<any>({
    endpoint: '/api/admin/nfts',
    body: body,
    options: options,
  });
}

export async function getNfts(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({ endpoint: '/api/admin/nfts', params: params, options: options });
}

export async function getNft(
  id?: string,
  options?: { [key: string]: any },
): Promise<Record<string, any>> {
  return api.get<Record<string, any>>({
    endpoint: `/api/admin/nfts/${id}`,
    options: options,
  });
}

export async function deleteNFT(id?: string, options?: { [key: string]: any }) {
  return api.delete<any>({
    endpoint: `/api/admin/nfts/${id}`,
    options: options,
  });
}
