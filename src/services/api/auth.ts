// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return api.post<API.LoginResult>({
    endpoint: '/api/auth/login',
    body: body,
    options: options,
  });
}

export async function outLogin(
  options?: { [key: string]: any },
  address?: string,
): Promise<Record<string, any>> {
  return api.delete<Record<string, any>>({
    endpoint: `/api/auth/${address}`,
    options: options,
  });
}

export async function refreshToken(body: API.RefreshTokenParams, options?: { [key: string]: any }) {
  return api.post<API.LoginResult>({
    endpoint: '/api/auth/refresh',
    body: body,
    options: options,
  });
}
