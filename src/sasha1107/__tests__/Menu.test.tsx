import { getByRole, render } from '@testing-library/react';
import { MenuList } from '../components';
import menuData from '../constants/menu.json';
import type { MenuListInterface } from '../types';

const mockData: MenuListInterface = menuData;

describe('Menu Component', () => {
  it('should render Card component', () => {
    const { getAllByRole } = render(<MenuList data={mockData} />);

    const { menus } = mockData;

    const menuListItems = getAllByRole('listitem');

    menus.forEach(({ name, options, tags }, index) => {
      const menuItem = menuListItems[index];
      expect(menuItem).toHaveTextContent(name);
      options.forEach(({ price }) => {
        expect(menuItem).toHaveTextContent(`${price.toLocaleString()}원`);
      });

      tags.forEach((item) => {
        expect(menuItem).toHaveTextContent(item);
      });
    });
  });

  it('should render <span class="badge">인기</span> if isPopular is true', () => {
    const { getAllByRole } = render(<MenuList data={mockData} />);
    const { menus } = mockData;
    const menuListItems = getAllByRole('listitem');

    menus
      .filter((item) => item.isPopular)
      .forEach(({ name }) => {
        const menuItem = menuListItems.find((item) => item.textContent?.includes(name));
        const badge = menuItem?.querySelector('span.badge');
        expect(badge).toBeInTheDocument();
      });
  });

  it('should not render <span class="badge">인기</span> if isPopular is false', () => {
    const { getAllByRole } = render(<MenuList data={mockData} />);
    const { menus } = mockData;
    const menuListItems = getAllByRole('listitem');

    menus
      .filter((item) => !item.isPopular)
      .forEach(({ name }) => {
        const menuItem = menuListItems.find((item) => item.textContent?.includes(name));
        const badge = menuItem?.querySelector('span.badge');
        expect(badge).not.toBeInTheDocument();
      });
  });

  it('should render image if data has imgUrl property', () => {
    const { getAllByRole } = render(<MenuList data={mockData} />);
    const { menus } = mockData;
    const menuListItems = getAllByRole('listitem');

    menus
      .filter((item) => item.image)
      .forEach(({ name, image }) => {
        const menuItem = menuListItems.find((item) => item.textContent?.includes(name));
        const imgElement = getByRole(menuItem!, 'img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', image);
        expect(imgElement).toHaveAttribute('alt', `${name} 이미지`);
      });
  });

  it('should not render image if data has no imgUrl property', () => {
    const { getAllByRole } = render(<MenuList data={mockData} />);
    const { menus } = mockData;
    const menuListItems = getAllByRole('listitem');

    menus
      .filter((item) => !item.image)
      .forEach(({ name }) => {
        const menuItem = menuListItems.find((item) => item.textContent?.includes(name));
        const imgElement = getByRole(menuItem!, 'img');

        expect(imgElement).not.toBeInTheDocument();
      });
  });
});
