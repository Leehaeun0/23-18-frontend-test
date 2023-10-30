import { MenuInfo } from '../Menu/types';
import Heading from '../Heading/Heading';
import { NumberAdjuster } from '../NumberAdjuster';

interface Props {
  menu: MenuInfo;
}

const MenuOption = ({ menu }: Props) => {
  const { name, options, image, description, isPopular } = menu;
  const isMultiOption = options.length > 1;

  return (
    <form>
      {image && <img src={image} alt={name} data-testid="image" />}

      <div>
        <Heading headingLevel="h3" data-testid="name">
          {isPopular && <span data-testid="popular">인기</span>}
          {name}
        </Heading>

        {description && <p data-testid="description">{description}</p>}

        {!isMultiOption && (
          <div>
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

            <ul>
              {options?.map((option, key) => (
                <li key={key}>
                  <label>
                    <input type="radio" />
                    <p>{option?.name}</p>
                    <p>{option.price}원</p>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        )}

        <li>
          <p>수량</p>
          <NumberAdjuster onChange={(num) => console.log(num)} />
        </li>
      </ol>

      <div>
        <button type="submit">00000원 담기</button>
      </div>
    </form>
  );
};

export default MenuOption;
