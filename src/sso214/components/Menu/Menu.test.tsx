import { render } from '@testing-library/react';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem } from '../../types/Model';
import snack_menu from '../../mock/snack_menu.json';
import { CustomMenu } from './index';

function renderMenu(props?: Partial<MenuItem>) {
  const DATA = snack_menu.menus[0] as Required<MenuItem>;

  const result = render(<CustomMenu menu={{ ...DATA, ...props }} />);

  const Item = () => result.getByTestId(TEST_ID.MENU.ITEM);
  const Name = () => result.getByTestId(TEST_ID.MENU.NAME);
  const PopularBadge = () => result.queryByTestId(TEST_ID.MENU.POPULAR);
  const Description = () => result.queryByTestId(TEST_ID.MENU.DESCRIPTION);
  const Prices = () => result.getByTestId(TEST_ID.MENU.PRICES);
  const PricesItem = () => result.queryAllByTestId(TEST_ID.MENU.PRICES_ITEM);
  const Tags = () => result.queryByTestId(TEST_ID.MENU.TAGS);
  const TagsItem = () => result.queryAllByTestId(TEST_ID.MENU.TAGS_ITEM);
  const Image = () => result.queryByTestId(TEST_ID.MENU.IMAGE);

  return {
    DATA,

    Item,
    Name,
    PopularBadge,
    Description,
    Prices,
    PricesItem,
    Tags,
    TagsItem,
    Image,
  };
}

describe('<Menu />', () => {
  it('처음 렌더링 시 각 요소들이 올바르게 렌더링된다.', () => {
    const { DATA, Item, Name, PopularBadge, Description, Prices, PricesItem, Tags, TagsItem, Image } =
      renderMenu();

    expect(Item()).toBeInTheDocument();
    expect(Name()).toHaveTextContent(DATA.name);
    expect(PopularBadge()).toHaveTextContent('인기');
    expect(Description()).toHaveTextContent(DATA.description);
    expect(PricesItem().length).toBe(DATA.options.length);
    expect(Prices()).toHaveTextContent(
      DATA.options.map(({ name, price }) => `${name && `${name} :`}${price}원`).join(''),
    );
    expect(TagsItem().length).toBe(DATA.tags.length);
    expect(Tags()).toHaveTextContent(DATA.tags.join(''));
    expect(Image()).toHaveAttribute('src', DATA.image);
  });

  it('option의 name 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Prices } = renderMenu({ options: [{ price: '5000' }] });

    expect(Prices()).toHaveTextContent('5000원');
  });

  it('image 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Image } = renderMenu({ image: undefined });

    expect(Image()).not.toBeInTheDocument();
  });

  it('description 데이터가 없을 경우 해당 부분을 렌더링하지 않는다.', () => {
    const { Description } = renderMenu({ description: undefined });

    expect(Description()).not.toBeInTheDocument();
  });

  it('isPopular 데이터가 없을 경우 "인기" 태그가 렌더링되지 않는다.', () => {
    const { PopularBadge } = renderMenu({ isPopular: false });

    expect(PopularBadge()).not.toBeInTheDocument();
  });

  it('tag가 주어지지 않을 경우 렌더링되지 않는다.', () => {
    const { Tags } = renderMenu({ tags: [] });

    expect(Tags()).not.toBeInTheDocument();
  });
});
