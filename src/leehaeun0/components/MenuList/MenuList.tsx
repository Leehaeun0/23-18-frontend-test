import { MenuListType } from 'src/leehaeun0/types/menu';
import MenuItem from '../MenuItem/MenuItem';

export default function MenuList({ data }: { data: MenuListType }) {
  return (
    <main>
      <h2>{data.title}</h2>
      <ol>
        {data.menus.map((menu) => (
          <MenuItem key={menu.name} data={menu} />
        ))}
      </ol>
    </main>
  );
}
