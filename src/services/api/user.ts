import { api } from '..';

export async function currentUser(options?: { [key: string]: any }, headers?: any) {
  return api.get<API.CurrentUser>({
    endpoint: '/api/admin/users/currentUser',
    headers: headers,
    options: options,
  });
}
