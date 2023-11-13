export interface MenuItemOption {
  name?: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  options: MenuItemOption[];
  image?: string;
  description?: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface Menus {
  id: number;
  title: string;
  menus: MenuItem[];
}

export type CartItemOption = MenuItemOption & { count: number };
export type CartItem = MenuItem & { option: CartItemOption };
