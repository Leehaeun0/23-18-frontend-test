export interface MenuItemOption {
  name?: string;
  price: number;
}

export interface MenuItem {
  name: string;
  options: MenuItemOption[];
  image?: string;
  description?: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface MenuList {
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
