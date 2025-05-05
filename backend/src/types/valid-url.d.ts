// Replace the entire content with:
declare module 'valid-url' {
  export function isWebUri(uri: string): string | undefined;
  export function isUri(uri: string): string | undefined;
  export function isHttpUri(uri: string): string | undefined;
  export function isHttpsUri(uri: string): string | undefined;
}