import styles from './style.module.css';
import { 메뉴 } from '../../types';
import { formatKrPrice } from '../../utils';
import { TEST_ID } from '../../constant';

export interface Props {
  item: 메뉴;
  onClick: (menuId: string) => void;
}

export default function MenuItem({ item, onClick }: Props) {
  const { name, description, options, image, isPopular = false, id } = item;

  return (
    <div className={styles.container} onClick={() => onClick(id)} data-testid={TEST_ID.MENU_ITEM}>
      <div className={styles.info}>
        <p className={styles.title}>{name}</p>
        {description && <p className={styles.description}>{description}</p>}
        {options.map(({ name, price }, index) => (
          <p className={styles.price} key={`${name}-${index}`}>
            {name && <span>{name} : </span>}
            {formatKrPrice(price)}원
          </p>
        ))}
        {isPopular && <div className={styles.badge}>사장님 추천</div>}
      </div>
      <img src={image} alt={name} />
    </div>
  );
}
