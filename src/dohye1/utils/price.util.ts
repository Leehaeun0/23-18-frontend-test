/**
 *
 * @param price 숫자나 문자 타입의 금액
 * @returns 천단위 구분자가 찍힌 금액
 */
export const formatKrPrice = (price: string | number) => {
  const priceNum = Number(price);

  if (Number.isNaN(priceNum)) {
    throw 'NaN';
  }
  return new Intl.NumberFormat('ko', { currency: 'KRW' }).format(priceNum);
};

export const getArrSum = (numArr: number[]) => {
  return numArr.reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0);
};
