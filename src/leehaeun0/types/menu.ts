export interface MenuListType {
  title: string;
  menus: MenuItemType[];
}

export interface MenuItemType {
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  image?: string;
  description?: string;
  isPopular?: boolean;
  tags?: string[];
}
