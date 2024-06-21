// @ts-ignore
/* eslint-disable */
import { api } from '..';

export async function createUser(body: API.User, options?: { [key: string]: any }) {
  return api.post<any>({ endpoint: '/user', body: body, options: options });
}

export async function getUserByName(
  params: API.getUserByNameParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return api.get<API.User>({ endpoint: `/user/${param0}`, params: queryParams, options: options });
}

export async function updateUser(
  params: API.updateUserParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return api.put<any>({
    endpoint: `/user/${param0}`,
    params: queryParams,
    body: body,
    options: options,
  });
}

export async function deleteUser(params: API.deleteUserParams, options?: { [key: string]: any }) {
  const { username: param0, ...queryParams } = params;
  return api.delete<any>({
    endpoint: `/user/${param0}`,
    params: queryParams,
    options: options,
  });
}

export async function createUsersWithArrayInput(
  body: API.User[],
  options?: { [key: string]: any },
) {
  return api.post<any>({ endpoint: '/user/createWithArray', body: body, options: options });
}

export async function createUsersWithListInput(body: API.User[], options?: { [key: string]: any }) {
  return api.post<any>({ endpoint: '/user/createWithList', body: body, options: options });
}

export async function loginUser(params: API.loginUserParams, options?: { [key: string]: any }) {
  return api.get<string>({ endpoint: '/user/login', params: params, options: options });
}

export async function logoutUser(options?: { [key: string]: any }) {
  return api.get<any>({ endpoint: '/user/logout', options: options });
}
