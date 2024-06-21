// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function getFakeCaptcha(
  params: {
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return api.get<API.FakeCaptcha>({
    endpoint: '/api/login/captcha',
    params: params,
    options: options,
  });
}
