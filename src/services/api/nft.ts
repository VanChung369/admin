import { api } from '..';

export async function createNFT(body: API.CreateNFT, options?: { [key: string]: any }) {
  return api.post<any>({
    endpoint: '/api/admin/nfts',
    body: body,
    options: options,
  });
}
