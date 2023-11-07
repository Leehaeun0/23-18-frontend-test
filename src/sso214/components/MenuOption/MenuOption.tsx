import { useReducer } from 'react';
import { MenuInfo } from '../Menu/types';
import Heading from '../Heading/Heading';
import NumberAdjuster from '../NumberAdjuster/NumberAdjuster';
import Radios from '../Radios/Radios';

interface FormValue {
  price: number;
  quantity: number;
  amount: number;
}

interface Props {
  menu: MenuInfo;
  handleSubmit: (value: FormValue) => void;
}

const MenuOption = ({ menu, handleSubmit }: Props) => {
  const { name, options, image, description, isPopular } = menu;
  const isMultiOption = options.length > 1;

  function reducer(state: FormValue, action: { name: keyof FormValue; value: FormValue[keyof FormValue] }) {
    const multiplyTarget = action.name === 'price' ? state.quantity : state.price;
    return {
      ...state,
      [action.name]: action.value,
      amount: multiplyTarget * action.value,
    };
  }

  const [state, dispatch] = useReducer(reducer, {
    price: options[0].price || 0,
    quantity: 1,
    amount: options[0].price || 0,
  });

  return (
    <form data-testid="form" onSubmit={() => handleSubmit(state)}>
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
              onChange={(value) => dispatch({ name: 'price', value: +value })}
              data={options?.map(({ name, price }) => ({
                label: name,
                value: `${price}`,
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
          <NumberAdjuster onChange={(value) => dispatch({ name: 'quantity', value })} />
        </li>
      </ol>

      <div>
        <button type="submit" data-testid="submitButton">
          {state.amount}원 담기
        </button>
      </div>
    </form>
  );
};

export default MenuOption;
