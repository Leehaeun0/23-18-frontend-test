import { useState } from 'react';
import S from './styles.module.css';

interface Props {
  onClick: (value: number) => void;
}

const NumberAdjuster = ({ onClick }: Props) => {
  const [value, setValue] = useState(1);
  const isMinimum = value === 1;

  const decreaseValue = () => {
    const newValue = value - 1;
    setValue(newValue);
    onClick(newValue);
  };

  const increaseValue = () => {
    const newValue = value + 1;
    setValue(newValue);
    onClick(newValue);
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
