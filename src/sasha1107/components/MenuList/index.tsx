import { Menu } from '../../components';
import type { MenuListInterface } from '../../types';

const MenuList = ({ data }: { data: MenuListInterface }) => {
  const { title, menus } = data;
  return (
    <>
      <h2>{title}</h2>
      <ol>
        {menus.map((item, index) => (
          <Menu data={item} key={index} />
        ))}
      </ol>
    </>
  );
};

export default MenuList;
