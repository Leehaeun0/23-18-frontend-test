import styles from './style.module.css';
import MenuItem from '../MenuItem';
import { 메뉴목록 } from '../../types';
import { TEST_ID } from '../../constant';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { useMemo } from 'react';

interface Props {
  menuList: 메뉴목록[];
}

export default function MenuList({ menuList }: Props) {
  const navigate = useNavigate();
  const { cartList } = useCart();

  const handleClickMenu = (menuId: string) => {
    navigate(`menu/${menuId}`, { relative: 'path' });
  };

  const [itemCount, totalSum] = useMemo(() => {
    if (!cartList) return [0, 0];
    const count = Object.keys(cartList).length;
    const sum = Object.values(cartList).reduce((acc, item) => {
      acc += item.count * item.price;
      return acc;
    }, 0);

    return [count, sum];
  }, [cartList]);

  return (
    <div className={styles.container} data-testid={TEST_ID.MENU_LIST}>
      {menuList.map(({ title, menus }, index) => (
        <ul className={styles.group} key={`${title}-${index}`} data-testid={TEST_ID.MENU_GROUP}>
          {title && <div className={styles.title}>{title}</div>}
          <li className={styles.list}>
            {menus.map((menu, index) => (
              <MenuItem item={menu} key={`${menu.name}-${index}`} onClick={handleClickMenu} />
            ))}
          </li>
        </ul>
      ))}
      {itemCount > 0 && (
        <button data-testid={TEST_ID.ORDER}>
          {itemCount} 주문하기 {totalSum}원
        </button>
      )}
    </div>
  );
}
