import { MenuItem } from '../../types/Model';
import { CustomHeading } from '../Heading';
import S from './style.module.css';

interface Props {
  menu: MenuItem;
}

const Menu = ({ menu }: Props) => {
  const { name, options, image, description, isPopular, tags } = menu;

  return (
    <li className={S.container} data-testid="item">
      <div className={S.info}>
        <CustomHeading headingLevel="h3" data-testid="name">
          {name}
          {isPopular && (
            <span className={`${S.badge} ${S.popularBadge}`} data-testid="popular">
              인기
            </span>
          )}
        </CustomHeading>

        {description && (
          <p className={S.description} data-testid="description">
            {description}
          </p>
        )}

        <ul className={S.prices} data-testid="prices">
          {options.map((option, index) => (
            <li key={index} data-testid="pricesItem">
              {option.name && `${option.name} :`}
              <b>{option.price}원</b>
            </li>
          ))}
        </ul>

        {tags?.length > 0 && (
          <ol className={S.tags} data-testid="tags">
            {tags?.map((tag) => (
              <li key={tag} className={S.badge} data-testid="tagsItem">
                {tag}
              </li>
            ))}
          </ol>
        )}
      </div>

      {image && (
        <div className={S.imageBox}>
          <img src={image} alt={name} data-testid="image" />
        </div>
      )}
    </li>
  );
};

export default Menu;
