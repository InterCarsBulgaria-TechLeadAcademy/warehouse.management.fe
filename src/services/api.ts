import { getAccessToken, getRefreshToken } from '@/hooks/services/auth/useAuth'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://leads-academy-intercars.com'
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source()

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const headers = {
    ...config.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}, Refresh ${refreshToken}` } : {})
  };

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers,
    cancelToken: source.token
  }).then(({ data }) => data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise as Promise<T>
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
