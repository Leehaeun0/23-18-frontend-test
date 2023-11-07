import { useEffect, useState } from 'react';
import S from './MenuOption.module.css';
import { MenuOptionsProps } from './types';
import { CHANGE_AMOUNT, DEFAULT_AMOUNT, MINIMUM_VALUE } from './constant';

export const MenuOption = (sampleData: MenuOptionsProps) => {
  const [count, setCount] = useState<number>(MINIMUM_VALUE);
  const [selectedPrice, setSelectedPrice] = useState(
    sampleData?.selectList[DEFAULT_AMOUNT].price ?? DEFAULT_AMOUNT,
  );
  const [totalPrice, setTotalPrice] = useState<number>(DEFAULT_AMOUNT);

  const changeCount = (type: string) => {
    if (type === 'increase') {
      setCount((prev) => prev + CHANGE_AMOUNT);
    } else {
      if (count > MINIMUM_VALUE) {
        setCount((prev) => prev - CHANGE_AMOUNT);
      }
    }
  };

  useEffect(() => {
    setTotalPrice(sampleData.defaultPrice * count);
  }, [sampleData.defaultPrice, count, sampleData.optionSelect]);

  useEffect(() => {
    setTotalPrice(selectedPrice * count);
  }, [selectedPrice, count]);

  return (
    <>
      <div className={S.wrap}>
        <div className={S.imgBox}>
          <img src={sampleData.image ?? 'baseURL'} alt={sampleData.name} />
        </div>
        <div className={S.main}>
          <div className={S.mainHeader}>
            {sampleData.isPopular && <span className={S.popularTag}>인기</span>}
            <h1>{sampleData.name}</h1>
          </div>
          <div className={S.description}>
            <span>{sampleData.description}</span>
          </div>
          <div>
            <span className={S.name}>{`메뉴 리뷰 ${sampleData.review}개 {'>'}`}</span>
          </div>
        </div>
        <div className={S.main}>
          <div className={S.mainHeader}>
            <p className={S.name}>가격</p>
            {sampleData.selectList.every((item) => !item) ? (
              <span>{sampleData.defaultPrice}</span>
            ) : (
              <span className={S.essential}>필수</span>
            )}
          </div>
          {sampleData.optionSelect && (
            <fieldset role="radiogroup" className={S.tagList}>
              {sampleData.selectList.every((item) => !item)
                ? ''
                : sampleData.selectList.map(({ name, price }, index) => (
                    <label key={index} className={S.sampleDataList} aria-label="labelList">
                      <div>
                        <input
                          aria-label={name}
                          name="menu"
                          type="radio"
                          value={price}
                          onChange={() => setSelectedPrice(price)}
                          checked={price === selectedPrice}
                        />
                        <span>{name}</span>
                      </div>
                      <span>{price}</span>
                    </label>
                  ))}
            </fieldset>
          )}
        </div>
        <div className={S.mainHeader}>
          <p className={S.name}>수량</p>
          <div className={S.amountBox}>
            <button role="button" aria-label="decreaseBtn" onClick={() => changeCount('decrease')}>
              -
            </button>
            <span role="span" aria-label="countSpan">
              {count}
            </span>
            <button role="button" aria-label="increaseBtn" onClick={() => changeCount('increase')}>
              +
            </button>
          </div>
        </div>
        <div className={S.textarea}>
          <span>메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.</span>
        </div>
        <div className={S.footer}>
          <div className={S.info}>
            <p>배달최소금액</p>
            <span>{sampleData.minOrderPrice}</span>
          </div>
          <div>
            <button
              onClick={() =>
                alert(
                  `${
                    totalPrice === DEFAULT_AMOUNT ? sampleData.minOrderPrice : totalPrice
                  }원을 주문하시겠습니까?`,
                )
              }
              className={S.add}
            >{`${totalPrice === DEFAULT_AMOUNT ? sampleData.minOrderPrice : totalPrice}원 담기`}</button>
          </div>
        </div>
      </div>
      ))
    </>
  );
};
