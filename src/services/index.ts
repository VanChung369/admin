import { HEADERS, HEADERS_MULTIPLE_PART } from '@/constants/api';
import { request } from '@umijs/max';

type ApiOptions = { [key: string]: any };
type ApiHeaders = { [key: string]: any };
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ApiRequestConfig<D = any> = {
  endpoint: string;
  params?: D;
  body?: any;
  options?: ApiOptions;
  headers?: ApiHeaders;
};

type ApiRequestConfigWithoutBody<D = any> = Omit<ApiRequestConfig<D>, 'body'>;

const requestApi = <T = any, D = any>(
  method: ApiMethod,
  defaultHeaders: ApiHeaders,
  { endpoint, params, body, options, headers }: ApiRequestConfig<D>,
) => {
  return request<T>(endpoint, {
    method,
    headers: headers || defaultHeaders,
    ...(body !== undefined ? { data: body } : {}),
    ...(params !== undefined ? { params } : {}),
    ...(options || {}),
  });
};

const api = {
  get: <T = any, D = any>(config: ApiRequestConfigWithoutBody<D>) => {
    return requestApi<T, D>('GET', HEADERS, config);
  },

  post: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('POST', HEADERS, config);
  },

  put: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('PUT', HEADERS, config);
  },

  patch: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('PATCH', HEADERS, config);
  },

  delete: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('DELETE', HEADERS, config);
  },

  postFormData: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('POST', HEADERS_MULTIPLE_PART, config);
  },

  putFormData: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('PUT', HEADERS_MULTIPLE_PART, config);
  },

  patchFormData: <T = any, D = any>(config: ApiRequestConfig<D>) => {
    return requestApi<T, D>('PATCH', HEADERS_MULTIPLE_PART, config);
  },
};

export { api };
