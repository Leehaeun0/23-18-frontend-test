import { useEffect, useState } from 'react';
import { TEST_ID } from '../../constant/TEST_ID';
import S from './styles.module.css';

interface Props {
  initValue?: number;
  onChange: (value: number) => void;
}

const NumberAdjuster = ({ onChange, initValue }: Props) => {
  const [value, setValue] = useState(initValue | 1);
  const isMinimum = value === 1;

  useEffect(() => {
    onChange(value);
  }, [value]);

  const decreaseValue = () => setValue((prevState) => prevState - 1);
  const increaseValue = () => setValue((prevState) => prevState + 1);

  return (
    <div className={S.numberAdjuster} data-testid={TEST_ID.NUMBER_ADJUSTER.NUMBER_ADJUSTER}>
      <button
        type="button"
        onClick={decreaseValue}
        disabled={isMinimum}
        data-testid={TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON}
      >
        {'<'}
      </button>

      <p data-testid={TEST_ID.NUMBER_ADJUSTER.VALUE}>{value}개</p>

      <button type="button" onClick={increaseValue} data-testid={TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON}>
        {'>'}
      </button>
    </div>
  );
};

export default NumberAdjuster;
