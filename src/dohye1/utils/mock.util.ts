import { 메뉴, 메뉴목록 } from '../types';
import { fakerKO as faker } from '@faker-js/faker';

const TITLE = ['연어포케', '우삼겹포케', '오리고기 포케', '들기름 메밀면 샐러드'];
const UNIT = ['개', '개', '팩'];

export const getSingleMenu = (): 메뉴 => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement(TITLE),
  options: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map((_, index) => ({
    name: `${index + 1}${UNIT[faker.number.int({ min: 0, max: UNIT.length })]}`,
    price: faker.number.int({ min: 9_000, max: 40_000 }),
  })),
  image: faker.image.urlLoremFlickr({ category: 'food' }),
  description: faker.lorem.sentence({ min: 4, max: 5 }),
  isPopular: faker.datatype.boolean(),
});

export const getMenuGroup = (title: string): 메뉴목록 => ({
  title,
  menus: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(getSingleMenu),
});

export const getMenuGroupList = (titleList?: string[]): 메뉴목록[] =>
  (
    titleList ??
    Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
      faker.lorem.word({ length: { min: 3, max: 8 } }),
    )
  ).map((title) => getMenuGroup(title));
