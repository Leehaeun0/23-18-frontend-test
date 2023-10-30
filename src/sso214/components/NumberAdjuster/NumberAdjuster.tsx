import { useState } from 'react';
import S from './styles.module.css';

interface Props {
  onChange: (value: number) => void;
}

const NumberAdjuster = ({ onChange }: Props) => {
  const [value, setValue] = useState(1);
  const isMinimum = value === 1;

  const decreaseValue = () => {
    setValue((prevState) => {
      const newValue = prevState - 1;
      onChange(newValue);
      return newValue;
    });
  };

  const increaseValue = () => {
    setValue((prevState) => {
      const newValue = prevState + 1;
      onChange(newValue);
      return newValue;
    });
  };

  return (
    <div className={S.numberAdjuster} data-testid="numberAdjuster">
      <button type="button" onClick={decreaseValue} disabled={isMinimum} data-testid="decreaseButton">
        {'<'}
      </button>

      <p data-testid="value">{value}개</p>

      <button type="button" onClick={increaseValue} data-testid="increaseButton">
        {'>'}
      </button>
    </div>
  );
};

export default NumberAdjuster;
