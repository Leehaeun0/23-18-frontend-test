import snack_menu from '../mock/snack_menu.json';
import cafe_menu from '../mock/cafe_menu.json';
import { CartItem, Menus } from '../types/Model';

export const STORE_LIST = [snack_menu, cafe_menu] as const;

export const getStoreMenus = (storeId: number) => STORE_LIST.find((store) => store.id === storeId) as Menus;
export const getStoreMenu = (storeId: number, menuId: number) => {
  const MENUS = getStoreMenus(storeId).menus;
  return MENUS.find((menu) => menu.id === menuId);
};

export const sumCartListTotalAmount = (cartList: CartItem[]) =>
  cartList.reduce((acc, { option }) => acc + option.price * option.count, 0);
