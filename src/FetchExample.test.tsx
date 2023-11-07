import { http, HttpResponse } from 'msw';
import { server } from './server/mockServer';

describe('GET /store', () => {
  it('"hi"를 응답해야 한다.', async () => {
    const response = await fetch(`${location.href}store`);

    await expect(response.text()).resolves.toEqual('hi');
  });

  it('"hello"를 응답하도록 mocking하면 "hello"를 응답해야 한다.', async () => {
    server.use(
      http.get('/store', () => {
        return HttpResponse.text('hello');
      }),
    );

    const response = await fetch(`${location.href}store`);

    await expect(response.text()).resolves.toEqual('hello');
  });
});
