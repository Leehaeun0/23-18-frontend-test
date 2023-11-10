import { render } from '@testing-library/react';
import { MenuItem } from '../../types/Model';
import snack_menu from '../../mock/snack_menu.json';
import List, { Props, CONTAINER_TAGS } from './List';

function renderList(props?: Partial<Props<MenuItem>>) {
  const DATA = snack_menu.menus;

  const result = render(
    <List<MenuItem>
      data={DATA}
      renderItem={() => <li data-testid="item" />}
      keyExtractor={(item) => item.name}
      containerTag="ol"
      {...props}
    />,
  );

  const ListWrap = () => result.getByTestId('list');
  const ListItems = () => result.queryAllByTestId('item');

  return {
    DATA,
    ListWrap,
    ListItems,
  };
}

describe('<List />', () => {
  it.each(CONTAINER_TAGS)('주어진 containerTag 에 맞는 태그가 렌더링된다.', (tag) => {
    const { ListWrap } = renderList({ containerTag: tag });

    expect(ListWrap().tagName).toBe(tag.toUpperCase());
  });

  it('주어진 데이터들을 올바르게 렌더링한다.', () => {
    const { ListItems, DATA } = renderList();

    expect(ListItems().length).toBe(DATA.length);
  });
});
