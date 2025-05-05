import * as validUrl from 'valid-url';

export const isValidUrl = (url: string): boolean => {
  return !!validUrl.isWebUri(url);
};