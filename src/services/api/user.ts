import { api } from '..';

const CURRENT_USER_ENDPOINT = '/api/admin/users/currentUser';

type RequestOptions = { [key: string]: any };
type RequestHeaders = { [key: string]: any };

export async function currentUser(options?: RequestOptions, headers?: RequestHeaders) {
  return api.get<API.CurrentUser>({
    endpoint: CURRENT_USER_ENDPOINT,
    headers,
    options,
  });
}
