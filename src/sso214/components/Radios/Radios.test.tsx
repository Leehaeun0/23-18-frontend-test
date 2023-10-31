import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radios, { Props } from './Radios';

function renderRadio(props?: Partial<Props>) {
  const DATA = [
    { label: '첫번째 아이템', value: '1', el: <p>첫번째 아이템 : 1</p> },
    { label: '두번째 아이템', value: '2', el: <p>두번째 아이템 : 2</p> },
    { label: '세번째 아이템', value: '3', el: <p>세번째 아이템 : 3</p> },
  ] as const;

  const mockOnClick = jest.fn();
  const result = render(<Radios name="list" onChange={mockOnClick} data={DATA} {...props} />);

  const Fieldset = () => result.getByTestId('fieldset');
  const Labels = () => result.queryAllByTestId('label');
  const RadioInput = (index: number) => Labels()[index].children[0];

  async function clickRadio(index: number) {
    await userEvent.click(RadioInput(index));
  }

  return {
    DATA,
    mockOnClick,

    Fieldset,
    Labels,
    RadioInput,

    clickRadio,
  };
}

describe('<Radios />', () => {
  it('처음 렌더링 시 라디오 버튼들이 올바르게 노출된다.', () => {
    const { Fieldset, Labels, RadioInput, DATA } = renderRadio();

    expect(Fieldset()).toBeInTheDocument();
    expect(Labels().length).toBe(DATA.length);
    expect(RadioInput(0)).toHaveAttribute('type', 'radio');
    expect(RadioInput(0)).toHaveAttribute('name', 'list');
    expect(RadioInput(0)).toHaveAttribute('value', `${DATA[0].value}`);
  });

  it('defaultValue가 주어지지 않을 경우 첫번째 라디오 버튼이 선택되어 있어야 한다.', () => {
    const { RadioInput } = renderRadio();

    expect(RadioInput(0)).toBeChecked();
    expect(RadioInput(1)).not.toBeChecked();
    expect(RadioInput(2)).not.toBeChecked();
  });

  it('defaultValue가 주어진 경우 해당 라디오 버튼이 선택되어 있어야 한다.', () => {
    const { RadioInput } = renderRadio({ defaultValue: '2' });

    expect(RadioInput(0)).not.toBeChecked();
    expect(RadioInput(1)).toBeChecked();
    expect(RadioInput(2)).not.toBeChecked();
  });

  it('라디오 버튼을 클릭하면 해당 라디오 버튼이 선택된다.', async () => {
    const { clickRadio, RadioInput } = renderRadio();

    await clickRadio(1);

    expect(RadioInput(0)).not.toBeChecked();
    expect(RadioInput(1)).toBeChecked();
    expect(RadioInput(2)).not.toBeChecked();
  });

  it('라디오 버튼을 클릭하면 이벤트가 올바르게 호출된다.', async () => {
    const { clickRadio, mockOnClick } = renderRadio();

    await clickRadio(1);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenLastCalledWith(`${2}`);

    await clickRadio(2);
    expect(mockOnClick).toHaveBeenCalledTimes(2);
    expect(mockOnClick).toHaveBeenLastCalledWith(`${3}`);
  });
});
