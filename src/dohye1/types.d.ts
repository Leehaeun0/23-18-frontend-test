export interface Option {
  name?: string;
  price: number;
}

export interface CartItem extends Option {
  count: number;
}

export interface 메뉴 {
  id: string;
  name: string;
  options: Option[];
  image?: string;
  description?: string;
  isPopular: boolean;
  tags?: string[];
}

export interface 메뉴목록 {
  title?: string;
  menus: 메뉴[];
}
