import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TEST_ID } from '../../constant/TEST_ID';
import { CustomNumberAdjuster } from './index';

function renderNumberAdjuster() {
  const mockOnClick = jest.fn();
  const result = render(<CustomNumberAdjuster onChange={mockOnClick} />);

  const DecreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON);
  const IncreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON);
  const Value = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.VALUE);

  async function clickDecreaseButton() {
    await userEvent.click(DecreaseButton());
  }

  async function clickIncreaseButton() {
    await userEvent.click(IncreaseButton());
  }

  return {
    mockOnClick,

    DecreaseButton,
    IncreaseButton,
    Value,

    clickDecreaseButton,
    clickIncreaseButton,
  };
}

describe('<NumberAdjuster />', () => {
  it('초기 렌더링 시 최소값 1로 렌더링된다.', () => {
    const { DecreaseButton, IncreaseButton, Value } = renderNumberAdjuster();

    expect(DecreaseButton()).toBeInTheDocument();
    expect(IncreaseButton()).toBeInTheDocument();
    expect(Value()).toHaveTextContent('1개');
  });

  it('값이 1인 경우 "-"버튼이 비활성화된다.', () => {
    const { DecreaseButton, IncreaseButton, Value } = renderNumberAdjuster();

    expect(Value()).toHaveTextContent('1개');
    expect(DecreaseButton()).toBeDisabled();
    expect(IncreaseButton()).not.toBeDisabled();
  });

  it('"+" 버튼 클릭 시 값이 1 증가한다.', async () => {
    const { clickIncreaseButton, Value } = renderNumberAdjuster();

    await clickIncreaseButton();

    expect(Value()).toHaveTextContent('2개');
  });

  it('"-" 버튼 클릭 시 값이 1 감소한다.', async () => {
    const { clickIncreaseButton, clickDecreaseButton, Value } = renderNumberAdjuster();

    await clickIncreaseButton();
    await clickIncreaseButton();
    await clickDecreaseButton();

    expect(Value()).toHaveTextContent('2개');
  });

  it('버튼 클릭 시마다 onChange 이벤트가 동작한다.', async () => {
    const { mockOnClick, clickIncreaseButton, clickDecreaseButton } = renderNumberAdjuster();

    await clickIncreaseButton();
    expect(mockOnClick).toHaveBeenCalledTimes(2);
    expect(mockOnClick).toHaveBeenLastCalledWith(2);

    await clickDecreaseButton();
    expect(mockOnClick).toHaveBeenCalledTimes(3);
    expect(mockOnClick).toHaveBeenLastCalledWith(1);
  });
});
