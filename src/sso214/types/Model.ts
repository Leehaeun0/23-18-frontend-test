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

export interface Option {
  count: number;
}

export interface CartItem extends MenuItemOption {
  count: number;
}
