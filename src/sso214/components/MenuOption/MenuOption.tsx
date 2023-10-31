import { useState } from 'react';
import { MenuInfo } from '../Menu/types';
import Heading from '../Heading/Heading';
import NumberAdjuster from '../NumberAdjuster/NumberAdjuster';
import Radios from '../Radios/Radios';

interface Props {
  menu: MenuInfo;
}

interface FormValue {
  price: number;
  quantity: number;
  amount: number;
}

const MenuOption = ({ menu }: Props) => {
  const [formValue, setFormValue] = useState<FormValue>({
    price: 0,
    quantity: 1,
    amount: 0,
  });
  const { name, options, image, description, isPopular } = menu;

  const isMultiOption = options.length > 1;

  const handleRadios = (price: number) => {
    setFormValue(({ quantity }) => ({ price, quantity: quantity, amount: price * quantity }));
  };
  const handleNumberAdjuster = (quantity: number) => {
    setFormValue(({ price }) => ({ price, quantity, amount: price * quantity }));
  };

  return (
    <form data-testid="form">
      {image && <img src={image} alt={name} data-testid="image" />}

      <div>
        <Heading headingLevel="h3" data-testid="name">
          {isPopular && <span data-testid="popular">인기</span>}
          {name}
        </Heading>

        {description && <p data-testid="description">{description}</p>}

        {!isMultiOption && (
          <div data-testid="price">
            <Heading headingLevel="h4">가격</Heading>
            <Heading headingLevel="h4">${options[0].price}원</Heading>
          </div>
        )}
      </div>

      <ol>
        {isMultiOption && (
          <li>
            <div>
              <Heading headingLevel="h4">가격</Heading>
              <span>필수</span>
            </div>

            <Radios
              name="prices"
              onChange={handleRadios}
              data={options?.map(({ name, price }) => ({
                label: name,
                value: price,
                el: (
                  <div data-testid="pricesItem">
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
          <NumberAdjuster onChange={handleNumberAdjuster} />
        </li>
      </ol>

      <div>
        <button type="submit" data-testid="submitButton">
          {formValue.amount}원 담기
        </button>
      </div>
    </form>
  );
};

export default MenuOption;
