import { resolve } from 'node:path';
import { generateApi } from 'swagger-typescript-api';

await generateApi({
  fileName: 'api.ts',
  output: resolve(process.cwd(), './src/api/generated'),
  url: 'http://127.0.0.1:8002/openapi.json',
  httpClientType: 'axios',
});
