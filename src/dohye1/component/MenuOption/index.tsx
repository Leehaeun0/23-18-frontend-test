import { useState } from 'react';
import { 메뉴, Option, CartItem } from '../../types';
import { TEST_ID } from '../../constant';

interface Props extends 메뉴 {
  reviewCount?: number;
  onAddToCart: (value: { id: string; item: CartItem }) => void;
}

export default function MenuOption({
  image,
  name,
  isPopular,
  description,
  reviewCount,
  options,
  id,
  onAddToCart,
}: Props) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [count, setCount] = useState(1);

  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h2>
        {isPopular && <div aria-label="popular">인기</div>}
        {name}
      </h2>
      {description && <p aria-label="description">{description}</p>}
      {reviewCount && <p>메뉴리뷰 {reviewCount}개</p>}
      {options.length === 1 ? (
        <SingleOption count={count} onChangeCount={setCount} option={options[0]} />
      ) : (
        <MultiOption options={options} selectedOption={selectedOption} onChange={setSelectedOption} />
      )}
      <button
        data-testid={TEST_ID.ADD_TO_CART}
        onClick={() => {
          onAddToCart({ id, item: { ...selectedOption, count } });
        }}
        // FIXME: 흠...좋은방법인진 몰겠는데....
        data-count={count}
      >
        {selectedOption?.price * count}원 담기
      </button>
    </div>
  );
}

const SingleOption = ({
  option,
  count,
  onChangeCount,
}: {
  option: Option;
  count: number;
  onChangeCount: (count: number) => void;
}) => {
  const { price } = option;
  return (
    <div>
      <div>
        <p>가격</p>
        <p>{price}</p>
      </div>
      <div />
      <div>수량</div>
      <div>
        <button onClick={() => onChangeCount(count - 1)}>-</button>
        <p data-testid={TEST_ID.ORDER_COUNT}>{count}</p>
        <button onClick={() => onChangeCount(count + 1)}>+</button>
      </div>
    </div>
  );
};

const MultiOption = ({
  options,
}: {
  options: Option[];
  selectedOption: Option;
  onChange: (option: Option) => void;
}) => {
  return (
    <div>
      <p>가격</p>
      <ul>
        {options.map((option) => (
          <li key={option.name}>
            <label htmlFor={option.name}>
              <input type="checkbox" id={option.name} />
              {option.price}
            </label>
            <p>{option.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
