export interface MenuOptionsProps {
  name: string;
  isPopular: boolean;
  description: string;
  review: number;
  optionSelect: boolean;
  selectList: { name: string; price: number }[] | [];
  image: string | null;
  minOrderPrice: number;
  defaultPrice: number;
}
