import { MenuListType } from '../types/menu';

export const MENU_DATA: MenuListType = {
  id: '1',
  title: '따끈한 삼첩분식 신상',
  menus: [
    {
      id: '1',
      name: '[꼬마] 새우마요김밥',
      options: [
        { name: '1줄', price: 1500 },
        { name: '3줄', price: 4000 },
        { name: '5줄', price: 7000 },
      ],
      image: 'image01.png',
      description: '고소한 새우튀김과 특제 마요소스',
      isPopular: true,
      tags: ['사장님 추천', '배민 추천'],
    },
    {
      id: '2',
      name: '[부산] 가래떡 떡볶이',
      options: [{ price: 5900 }],
      image: 'image02.png',
      description: '달짝지근 매콤함과 통통한 밀가래떡, 맛감자',
      isPopular: true,
      tags: ['사장님 추천'],
    },
    {
      id: '3',
      name: '물떡 & 어묵탕',
      options: [{ price: 4900 }],
      image: 'image03.png',
      description: '칼칼한 국물과 탱탱한 밀가래떡과 어묵',
    },
  ],
};
