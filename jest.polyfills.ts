import { TextEncoder, TextDecoder } from 'node:util';
import { Blob } from 'node:buffer';

Reflect.set(globalThis, 'TextEncoder', TextEncoder);
Reflect.set(globalThis, 'TextDecoder', TextDecoder);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
import('undici').then(({ fetch, Request, Response, Headers, FormData }) => {
  Reflect.set(globalThis, 'fetch', fetch);
  Reflect.set(globalThis, 'Blob', Blob);
  Reflect.set(globalThis, 'Request', Request);
  Reflect.set(globalThis, 'Response', Response);
  Reflect.set(globalThis, 'Headers', Headers);
  Reflect.set(globalThis, 'FormData', FormData);
});
