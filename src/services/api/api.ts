// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function currentUser(options?: { [key: string]: any }) {
  return api.get<{ data: API.CurrentUser }>({ endpoint: '/api/currentUser', options: options });
}

export async function outLogin(options?: { [key: string]: any }): Promise<Record<string, any>> {
  return api.post<Record<string, any>>({ endpoint: '/api/login/outLogin', options: options });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return api.post<API.LoginResult>({
    endpoint: '/api/login/account',
    body: body,
    options: options,
  });
}

export async function getNotices(options?: { [key: string]: any }) {
  return api.get<API.NoticeIconList>({ endpoint: '/api/notices', options: options });
}

export async function rule(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return api.get<API.RuleList>({ endpoint: '/api/rule', params: params, options: options });
}

export async function updateRule(options?: { [key: string]: any }) {
  return api.put<API.RuleListItem>({ endpoint: '/api/rule', options: options });
}

export async function addRule(options?: { [key: string]: any }) {
  return api.post<API.RuleListItem>({ endpoint: '/api/rule', options: options });
}

export async function removeRule(options?: { [key: string]: any }) {
  return api.delete<Record<string, any>>({ endpoint: '/api/rule', options: options });
}
