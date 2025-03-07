import { api } from '..';

export async function getTags(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/admin/tag',
    params: params,
    options: options,
  });
}

export async function createTag(body: API.CreateTag, options?: { [key: string]: any }) {
  return api.post<any>({
    endpoint: '/api/admin/tag',
    body: body,
    options: options,
  });
}

export async function editTag(id?: string, body?: API.EditTag, options?: { [key: string]: any }) {
  return api.patch<any>({
    endpoint: `/api/admin/tag/${id}`,
    body: body,
    options: options,
  });
}

export async function getTag(
  id?: string,
  options?: { [key: string]: any },
): Promise<Record<string, any>> {
  return api.get<Record<string, any>>({
    endpoint: `/api/admin/tag/${id}`,
    options: options,
  });
}
