import formatMessage from '@/components/FormatMessage';
import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { isUndefined } from './utils';

type CodeMessage = {
  [key: number]: string;
};

const codeMessage: CodeMessage = {
  200: 'The server successfully returns the request data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'Delete data successfully.',
  400: 'There are errors issued by the request, and the server does not perform new or modified data.',
  401: 'Users have no permissions (tokens, user names, password errors).',
  403: 'Users are authorized, but access is prohibited.',
  404: 'The requests are targeted at non -existent records, and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The request resources are permanently deleted and will not be obtained anymore.',
  422: 'When a object is created, an verification error occurs.',
  500: 'If the server is error, check the server.',
  502: 'Merchants error.',
  503: 'The service is unavailable, and the server is temporarily overloaded or maintained.',
  504: 'The gateway timeout.',
};

// Error treatment plan: error type
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
//The response data format agreed with the back end
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name Error treatment
 * The error handling of pro comes with it can make your own changes here
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error;
      }
    },

    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;

      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;

          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        if (!isUndefined(error.response?.data?.code)) {
          formatMessage({
            descriptor: {
              id: `codeMessage.${error.response?.data?.code}`,
              defaultMessage: error.response.statusText,
            },
            type: 'error',
          });
        } else if (error.response.data.code === '') {
          const errorText = codeMessage[error.response.status] || error.response.statusText;
          message.error(`${errorText}`);
        }
      } else if (error.request) {
        // The request has been successfully initiated, but did not receive a response
        // \ `` `Error.request \` `is an instance of XMLHTTPREQUEST in the browser,
        // In the instance of http.clientRequest in node.js
        message.error('None response! Please retry.');
      } else {
        // There is something wrong when sending a request
        message.error('Request error, please retry.');
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config?.url?.concat('');
      return { ...config, url };
    },
  ],

  responseInterceptors: [
    (response) => {
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('Request failed!');
      }
      return response;
    },
  ],
};
