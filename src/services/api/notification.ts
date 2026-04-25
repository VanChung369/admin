import { api } from '..';

// export async function getNotices(options?: { [key: string]: any }) {
//   return api.get<API.NoticeIconList>({ endpoint: '/api/notifications', options: options });
// }

export async function getNotices(params: any, options?: { [key: string]: any }) {
  return api.get<Record<string, any>>({
    endpoint: '/api/notifications',
    params: params,
    options: options,
  });
}

export async function markAsRead(id: string, body?: any) {
  return api.patch<any>({
    endpoint: `/api/notifications/${id}`,
    body: body,
  });
}
