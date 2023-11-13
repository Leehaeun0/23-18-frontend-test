import React from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem } from '../../types/Model';
import { CustomHeading } from '../Heading';
import S from './style.module.css';

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  menu: MenuItem;
}

const Menu = ({ menu, ...res }: Props) => {
  const { name, options, image, description, isPopular, tags } = menu;

  return (
    <li className={S.container} data-testid={TEST_ID.MENU.ITEM} {...res}>
      <div className={S.info}>
        <CustomHeading headingLevel="h3" data-testid={TEST_ID.MENU.NAME}>
          {name}
          {isPopular && (
            <span className={`${S.badge} ${S.popularBadge}`} data-testid={TEST_ID.MENU.POPULAR}>
              인기
            </span>
          )}
        </CustomHeading>

        {description && (
          <p className={S.description} data-testid={TEST_ID.MENU.DESCRIPTION}>
            {description}
          </p>
        )}

        <ul className={S.prices} data-testid={TEST_ID.MENU.PRICES}>
          {options.map((option, index) => (
            <li key={index} data-testid={TEST_ID.MENU.PRICES_ITEM}>
              {option.name && `${option.name} :`}
              <b>{option.price}원</b>
            </li>
          ))}
        </ul>

        {tags?.length > 0 && (
          <ol className={S.tags} data-testid={TEST_ID.MENU.TAGS}>
            {tags?.map((tag) => (
              <li key={tag} className={S.badge} data-testid={TEST_ID.MENU.TAGS_ITEM}>
                {tag}
              </li>
            ))}
          </ol>
        )}
      </div>

      {image && (
        <div className={S.imageBox}>
          <img src={image} alt={name} data-testid={TEST_ID.MENU.IMAGE} />
        </div>
      )}
    </li>
  );
};

export default Menu;
