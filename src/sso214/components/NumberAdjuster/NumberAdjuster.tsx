import { useState } from 'react';
import S from './styles.module.css';

interface Props {
  onClick: (value: number) => void;
}

const NumberAdjuster = ({ onClick }: Props) => {
  const [value, setValue] = useState(1);
  const isMinimum = value === 1;

  const decreaseValue = () => {
    setValue((prevState) => {
      const newValue = prevState - 1;
      onClick(newValue);
      return newValue;
    });
  };

  const increaseValue = () => {
    setValue((prevState) => {
      const newValue = prevState + 1;
      onClick(newValue);
      return newValue;
    });
  };

  return (
    <div className={S.numberAdjuster}>
      <button type="button" onClick={decreaseValue} disabled={isMinimum} data-testid="decreaseButton">
        &#45;
      </button>

      <p data-testid="value">{value}개</p>

      <button type="button" onClick={increaseValue} data-testid="increaseButton">
        &#43;
      </button>
    </div>
  );
};

export default NumberAdjuster;
