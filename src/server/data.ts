export interface MenuList {
  id: string;
  title: string;
  menus: Menu[];
}

export interface Menu {
  id: string;
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  description?: string;
  image?: string;
  isPopular: boolean;
  tags: string[];
}

export const getStoreMenu: () => MenuList[] = () => [
  {
    id: 'a382f0b9',
    title: '인기 메뉴',
    menus: [
      {
        id: '4022f81d',
        name: '[마라로제] 떡볶이',
        options: [{ price: 9900 }],
        description: '떡+포두부+분모자+유부',
        image: 'https://placehold.co/600x400',
        isPopular: true,
        tags: ['사장님 추천'],
      },
      {
        id: '6b1bced9',
        name: '일첩 세트',
        options: [{ price: 15000 }],
        description: '떡볶이 선택 + 감자폭탄1/2 + 5종튀김',
        image: 'https://placehold.co/600x400',
        isPopular: true,
        tags: ['사장님 추천'],
      },
      {
        id: 'f2c3daa9',
        name: '이첩 세트',
        options: [{ price: 18000 }],
        description: '떡볶이 선택 + 감자폭탄 + 토핑',
        image: 'https://placehold.co/600x400',
        isPopular: true,
        tags: [],
      },
    ],
  },
  {
    id: '15203df5',
    title: '토핑',
    menus: [
      {
        id: '74bfffe2',
        name: '오징어튀김',
        options: [
          { name: '2개', price: 2500 },
          { name: '5개', price: 5000 },
        ],
        description: '통통한 오징어살이 통째로 쫄깃한 식감의 오징어 튀김',
        image: 'https://placehold.co/600x400',
        isPopular: false,
        tags: [],
      },
      {
        id: 'caba67ec',
        name: '야채튀김',
        options: [{ name: '2개', price: 2500 }],
        image: 'https://placehold.co/600x400',
        isPopular: false,
        tags: [],
      },
      {
        id: 'ed0fc294',
        name: '순살치킨',
        options: [
          { name: '후라이드', price: 7500 },
          { name: '치즈뿌링', price: 8000 },
        ],
        description: '부드러운 닭다리살 순살치킨과 바삭한 카사바칩',
        image: 'https://placehold.co/600x400',
        isPopular: false,
        tags: [],
      },
    ],
  },
];
