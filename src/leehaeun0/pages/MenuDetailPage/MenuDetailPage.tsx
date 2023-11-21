import { useState } from 'react';
import { MenuItemType } from 'src/leehaeun0/types/menu';

export default function MenuDetailPage({ data }: { data: MenuItemType }) {
  const { name, options, isPopular, description, image, minOrderPrice } = data;
  const [selectedPrice, setSelectedPrice] = useState(options[0].price);
  const [amount, setAmount] = useState(1);

  return (
    <main>
      {image && <img src={image} alt={name} />}

      <section>
        <h1>
          {isPopular && <span role="badge">인기</span>}
          {name}
        </h1>
        {description && <div role="caption">{description}</div>}
      </section>

      <section>
        <h2>가격</h2>
        {options.length > 1 ? (
          // TODO: Radiogroup 컴포넌트 분리
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
                      setSelectedPrice(Number(e.target.value));
                    }}
                    checked={selectedPrice === price}
                  />
                </div>
              );
            })}
          </fieldset>
        ) : (
          <div>
            {options[0].name && <span>{options[0].name}</span>}
            <span data-testid="priceOnly">{`${options[0].price.toLocaleString()}원`}</span>
          </div>
        )}
      </section>

      <section>
        <h2>수량</h2>
        <div>
          <button
            disabled={amount === 1}
            aria-label="수량 감소"
            onClick={() => setAmount((prev) => prev - 1)}
          >
            -
          </button>
          <span aria-label="수량 값">{amount}개</span>
          <button aria-label="수량 증가" onClick={() => setAmount((prev) => prev + 1)}>
            +
          </button>
        </div>
      </section>

      <footer>
        {minOrderPrice && (
          <div>
            <span>배달최소주문금액</span>
            <span>{minOrderPrice?.toLocaleString()}원</span>
          </div>
        )}
        <button type="button" aria-label="최종금액">
          {(amount * selectedPrice).toLocaleString()}원 담기
        </button>
      </footer>
    </main>
  );
}
