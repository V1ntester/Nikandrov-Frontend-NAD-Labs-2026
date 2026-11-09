export function proxyMediaUrl(url?: string | null): string | null | undefined {
  return url?.replace(/^http:\/\/localhost:9000(?=\/media\/)/, '/s3') ?? url;
}
