import { http, HttpResponse } from 'msw';
import { getStoreMenu } from './data';

const storeMenu = getStoreMenu();

const getStore = http.get('/api/store/:storeId', () => {
  return HttpResponse.json({ storeMenu });
});

const getMenu = http.get('/api/store/:storeId/menu/:menuId', ({ params }) => {
  const store = storeMenu.find((store) => store.id === params.storeId);

  if (!store) {
    return new HttpResponse(null, { status: 404 });
  }

  const menu = store.menus.find((menu) => menu.id === params.menuId);

  if (!menu) {
    return new HttpResponse(null, { status: 404 });
  }

  return HttpResponse.json({ menu });
});

export const handlers = [getStore, getMenu];
