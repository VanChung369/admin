import { api } from '..';

export async function getNotices(options?: { [key: string]: any }) {
  return api.get<API.NoticeIconList>({ endpoint: '/api/notifications', options: options });
}
