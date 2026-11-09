import { isAxiosError } from 'axios';

export type SmrReadError = 'unavailable' | 'notFound' | 'failed';

export function classifySmrReadError(error: unknown): SmrReadError {
  if (!isAxiosError(error)) return 'failed';

  const response = error.response;
  if (response?.status === 404) return 'notFound';

  if (!response || [502, 503, 504].includes(response.status)
      || (response.status === 500 && response.data === '')) {
    return 'unavailable';
  }

  return 'failed';
}
