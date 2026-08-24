import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

const axiosIns = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  timeout: 30 * 1000,
  headers: {
    [CONTENT_TYPE]: APPLICATION_JSON,
  },
});

axiosIns.interceptors.request.use(
  (config) => {
    if (
      typeof FormData !== 'undefined' &&
      config.data instanceof FormData &&
      config.headers.has(CONTENT_TYPE)
    ) {
      config.headers.delete(CONTENT_TYPE);
    }

    if (config.data instanceof URLSearchParams) {
      config.headers.set(CONTENT_TYPE, 'application/x-www-form-urlencoded');
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosIns.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.statusText.toLocaleLowerCase() === 'ok') {
      return response;
    } else {
      console.error(response.statusText || 'Incorrect Response');
    }

    throw new AxiosError(
      response.statusText || 'Incorrect Response',
      AxiosError.ERR_BAD_RESPONSE,
      response.config,
      response.request,
      response,
    );
  },
  (error: AxiosError) => {
    const requestUrl = error.config?.url ?? '';
    if (error.response?.status) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      switch (error.response.status as HttpStatusCode) {
        case HttpStatusCode.Unauthorized:
          console.error('Authentication Failed' + ' ' + requestUrl);
          break;

        case HttpStatusCode.Forbidden:
          console.error('Access Denied' + ' ' + requestUrl);
          break;

        case HttpStatusCode.NotFound:
          console.error('Request Address Not Found' + ' ' + requestUrl);
          break;

        case HttpStatusCode.InternalServerError:
          console.error('Internal Server Error' + ' ' + requestUrl);
          break;

        default:
          console.error((error.response.statusText || 'Request Failed') + ' ' + requestUrl);
      }
    } else {
      switch (error.code) {
        case AxiosError.ECONNABORTED:
          console.error('Request Timeout' + ' ' + requestUrl);
          break;

        case AxiosError.ERR_NETWORK:
          console.error('Network Connection Failure' + ' ' + requestUrl);
          break;

        case AxiosError.ERR_CANCELED:
          console.error('Request Has Been Cancelled' + ' ' + requestUrl);
          break;

        default:
          console.error(error.message + ' ' + requestUrl);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Sends a GET request.
 *
 * @template R Response payload type from `apiResponseMsg.data`.
 * @template P Query params type.
 * @template D Axios request data type.
 * @param url Request URL.
 * @param params Query params. They are passed to Axios as `config.params`.
 * @param config Additional Axios request config.
 * @returns Axios response with the backend response envelope.
 */
export const get = async <R = unknown, P = unknown, D = unknown>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig<D, P>,
) => {
  return axiosIns.get<AxiosResponse<R>, AxiosResponse<R, D, object, P>, D, P>(url, {
    ...config,
    params,
  });
};

/**
 * Sends a POST request.
 *
 * @template R Response payload type from `apiResponseMsg.data`.
 * @template D Request body type.
 * @template P Query params type.
 * @param url Request URL.
 * @param data Request body.
 * @param config Additional Axios request config.
 * @returns Axios response with the backend response envelope.
 */
export const post = async <R = unknown, D = unknown, P = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D, P>,
) => {
  return axiosIns.post<AxiosResponse<R>, AxiosResponse<R, D, object, P>, D, P>(url, data, config);
};

export type WrapRequestResponse<T = unknown> =
  { success: true; data?: T | null } | { success: false; error: AxiosError };

/**
 * Wraps an API request and normalizes its result.
 *
 * @template R Response payload type from `apiResponseMsg.data`.
 * @param asyncRequestFn Function that executes the raw Axios request.
 * @returns A success result with response data, or a failure result with the caught Axios error.
 */
export const wrapRequest = async <R = unknown>(
  asyncRequestFn: () => Promise<AxiosResponse<R>>,
): Promise<WrapRequestResponse<R>> => {
  try {
    const res = await asyncRequestFn();
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err as AxiosError,
    };
  }
};
