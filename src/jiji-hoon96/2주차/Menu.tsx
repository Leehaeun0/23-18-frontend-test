import S from './Menu.module.css';
import { MenuProps } from './types';

interface MenuListProps {
  title: string;
  menus: MenuProps[];
}

export const Menu = ({ menus, title }: MenuListProps) => {
  return (
    <>
      <div className={S.title}>{title}</div>
      {menus.map((data, index) => (
        <div className={S.wrap} key={index}>
          <div className={S.info}>
            <h1 className={S.name}>
              {data.name}
              {data.isPopular && <span className={S.popularTag}>인기</span>}
            </h1>
            {data.description && <p className={S.description}>{data.description}</p>}
            <h1 className={S.price}>{data.options.price}</h1>
            {data.tags && (
              <ul className={S.tagList}>
                {data.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </div>

          <div className={S.imgBox}>
            <img src={data.image ?? 'baseUrl'} alt={data.name} />
          </div>
        </div>
      ))}
    </>
  );
};
