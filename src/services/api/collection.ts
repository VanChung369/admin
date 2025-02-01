import { api } from '..';

export async function getCollections(params: any, options?: { [key: string]: any }) {
  return api.get<{ data: any }>({
    endpoint: '/api/collection',
    params: params,
    options: options,
  });
}

export async function createCollection(body: API.CreateTag, options?: { [key: string]: any }) {
  return api.post<any>({
    endpoint: '/api/collection',
    body: body,
    options: options,
  });
}

export async function editCollection(
  id?: string,
  body?: API.EditTag,
  options?: { [key: string]: any },
) {
  return api.patch<any>({
    endpoint: `/api/collection/${id}`,
    body: body,
    options: options,
  });
}

export async function getCollection(
  id?: string,
  options?: { [key: string]: any },
): Promise<Record<string, any>> {
  return api.get<Record<string, any>>({
    endpoint: `/api/collection/${id}`,
    options: options,
  });
}
