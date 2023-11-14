import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { MenuInterface } from '../../types';
import { useQueryString } from '../../hooks';
import { encodeBase64 } from '../../utils';

const MenuOption = (props: MenuInterface) => {
  const { name, options, isPopular, description, image } = props;
  const { storeId } = useParams();
  const [price, setPrice] = useState(options[0].price);
  const [quantity, setQuantity] = useState(1);
  const MIN_ORDER_PRICE = 9900;
  const navigate = useNavigate();
  const { cart, price: accumulatePrice } = useQueryString();
  return (
    <div>
      {image && <img src={image} alt={`${name} 이미지`} />}
      <h2>
        {isPopular && <span role="badge">인기</span>}
        {name}
      </h2>
      {description && <div role="caption">{description}</div>}
      {options.length > 1 ? (
        <fieldset role="radiogroup">
          {options.map((option) => {
            const { name, price } = option;
            return (
              <div key={name}>
                <label htmlFor={name}>{name}</label>
                <input
                  type="radio"
                  id={name}
                  name="menu-option"
                  value={price}
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                />
              </div>
            );
          })}
        </fieldset>
      ) : (
        <div>
          <div>가격</div>
          <div>
            {options[0].name && <span>{options[0].name}</span>}
            <span data-testid="priceOnly">{`${options[0].price.toLocaleString()}원`}</span>
          </div>
        </div>
      )}
      <div>
        <div>수량</div>
        <div>
          <button
            role="button"
            disabled={quantity === 1}
            aria-label="수량 감소"
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </button>
          <span>{quantity}개</span>
          <button role="button" aria-label="수량 증가" onClick={() => setQuantity((prev) => prev + 1)}>
            +
          </button>
        </div>
      </div>
      <footer>
        <div>
          <span>배달최소주문금액</span>
          <span>{MIN_ORDER_PRICE.toLocaleString()}원</span>
        </div>
        <button
          role="button"
          aria-label="최종금액"
          onClick={() => {
            const newItem = { menuId: props.id, quantity };
            const existingItem = cart.find((item) => item.menuId === newItem.menuId);
            if (existingItem) {
              existingItem.quantity += newItem.quantity;
            } else {
              cart.push(newItem);
            }
            const newPrice = Number(accumulatePrice) + quantity * price;
            navigate(`/store/${storeId}?data=${encodeBase64(cart)}&price=${encodeBase64(newPrice)}`);
          }}
        >
          {(quantity * price).toLocaleString()}원 담기
        </button>
      </footer>
    </div>
  );
};

export default MenuOption;
