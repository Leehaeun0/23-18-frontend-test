import { http, HttpResponse } from 'msw';

const getStore = http.get('/store', () => {
  return HttpResponse.text('hi');
});

export const handlers = [getStore];
