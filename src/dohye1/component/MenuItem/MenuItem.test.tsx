import { render } from '@testing-library/react';
import MenuItem from '.';
import { getSingleMenu } from '../../utils';

const noop = () => console.log('noop');

describe('메뉴 아이템', () => {
  it('메뉴 아이템을 그리는가?', () => {
    const item = getSingleMenu();
    const itemNode = render(<MenuItem item={item} onClick={noop} />);

    // 이렇게 하는게 맞나..?
    expect(itemNode.container).toHaveTextContent(item.name);
    // expect(itemNode.container).toHaveTextContent(formatKrPrice(item.options));
  });

  it('이미지를 적절하게 그리는가?', () => {
    const item = getSingleMenu();
    const a = render(<MenuItem item={item} onClick={noop} />);

    const imageBox = a.getByRole('img', { name: item.name });

    expect(imageBox).toBeInTheDocument();
    expect(imageBox).toHaveAttribute('src', item.image);
    expect(imageBox).toHaveAttribute('alt', item.name);
  });
});
