export interface MenuProps {
  name: string;
  image?: string;
  options: {
    name?: string;
    price: number;
  };
  description?: string;
  tags: string[];
  isPopular: boolean;
}
