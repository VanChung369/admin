import { api } from '..';

export async function getConfig() {
  return api.get<{ data: any }>({ endpoint: '/api/config' });
}
