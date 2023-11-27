export interface MenuListType {
  id: string;
  title: string;
  menus: MenuItemType[];
}

export interface MenuItemType {
  id: string;
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  image?: string;
  description?: string;
  isPopular?: boolean;
  tags?: string[];
  minOrderPrice?: number;
}
