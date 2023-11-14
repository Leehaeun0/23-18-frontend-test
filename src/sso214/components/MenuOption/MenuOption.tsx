import { FormEvent, useState } from 'react';
import { MenuItem, SelectedMenuItem } from '../../types/Model';
import { TEST_ID } from '../../constant/TEST_ID';
import { CustomHeading } from '../Heading';
import { CustomNumberAdjuster } from '../NumberAdjuster';
import { CustomRadios } from '../Radios';

interface Props {
  menu: MenuItem;
  handleSubmit: (item: SelectedMenuItem) => void;
}

const MenuOption = ({ menu, handleSubmit }: Props) => {
  const { name, options, image, description, isPopular } = menu;
  const isMultiOption = options.length > 1;

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(1);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit({ ...menu, selectedOption: { index, count } });
  };

  return (
    <form data-testid={TEST_ID.MENU_OPTION.FORM} onSubmit={onSubmit}>
      {image && <img src={image} alt={name} data-testid={TEST_ID.MENU_OPTION.IMAGE} />}

      <div>
        <CustomHeading headingLevel="h3" data-testid={TEST_ID.MENU_OPTION.NAME}>
          {isPopular && <span data-testid={TEST_ID.MENU_OPTION.POPULAR}>인기</span>}
          {name}
        </CustomHeading>

        {description && <p data-testid={TEST_ID.MENU_OPTION.DESCRIPTION}>{description}</p>}

        {!isMultiOption && (
          <div data-testid={TEST_ID.MENU_OPTION.PRICE}>
            <CustomHeading headingLevel="h4">가격</CustomHeading>
            <CustomHeading headingLevel="h4">${options[0].price}원</CustomHeading>
          </div>
        )}
      </div>

      <ol>
        {isMultiOption && (
          <li>
            <div>
              <CustomHeading headingLevel="h4">가격</CustomHeading>
              <span>필수</span>
            </div>

            <CustomRadios
              name="prices"
              defaultValue={`${index}`}
              onChange={(value) => setIndex(+value)}
              data={options?.map(({ name, price }, index) => ({
                label: name,
                value: `${index}`,
                el: (
                  <div>
                    <p>{name}</p>
                    <p>{price}원</p>
                  </div>
                ),
              }))}
            />
          </li>
        )}

        <li>
          <p>수량</p>
          <CustomNumberAdjuster initValue={count} onChange={setCount} />
        </li>
      </ol>

      <div>
        <button type="submit" data-testid={TEST_ID.MENU_OPTION.SUBMIT_BUTTON}>
          {menu.options[index].price * count}원 담기
        </button>
      </div>
    </form>
  );
};

export default MenuOption;
