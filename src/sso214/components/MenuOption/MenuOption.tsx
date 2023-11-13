import { useReducer } from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem } from '../../types/Model';
import { CustomHeading } from '../Heading';
import { CustomNumberAdjuster } from '../NumberAdjuster';
import { CustomRadios } from '../Radios';

interface FormValue {
  price: number;
  quantity: number;
  amount: number;
}

interface Props {
  menu: MenuItem;
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
    <form data-testid={TEST_ID.MENU_OPTION.FORM} onSubmit={() => handleSubmit(state)}>
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
          <CustomNumberAdjuster onChange={(value) => dispatch({ name: 'quantity', value })} />
        </li>
      </ol>

      <div>
        <button type="submit" data-testid={TEST_ID.MENU_OPTION.SUBMIT_BUTTON}>
          {state.amount}원 담기
        </button>
      </div>
    </form>
  );
};

export default MenuOption;
