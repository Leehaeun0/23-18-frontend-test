import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TEST_ID } from '../../constant/TEST_ID';
import { Props } from './Radios';
import { CustomRadios } from './index';

function renderRadio(props?: Partial<Props>) {
  const DATA = [
    { label: '첫번째 아이템', value: '1개', el: <p>첫번째 아이템 : 1개</p> },
    { label: '두번째 아이템', value: '2개', el: <p>두번째 아이템 : 2개</p> },
    { label: '세번째 아이템', value: '3개', el: <p>세번째 아이템 : 3개</p> },
  ];

  const mockOnChange = jest.fn();
  const result = render(<CustomRadios name="list" onChange={mockOnChange} data={DATA} {...props} />);

  const RadioGroup = () => result.getByTestId(TEST_ID.RADIOS.RADIO_GROUP);
  const RadioItems = () => result.queryAllByTestId(TEST_ID.RADIOS.RADIO_ITEM);
  const Radio = (index: number) => RadioItems()[index].children[0];

  async function clickRadio(index: number) {
    await userEvent.click(Radio(index));
  }

  return {
    DATA,
    mockOnChange,

    RadioGroup,
    RadioItems,
    Radio,

    clickRadio,
  };
}

describe('<Radios />', () => {
  it('처음 렌더링 시 라디오 버튼들이 올바르게 노출된다.', () => {
    const { RadioGroup, RadioItems, Radio, DATA } = renderRadio();

    expect(RadioGroup()).toBeInTheDocument();
    expect(RadioItems().length).toBe(DATA.length);
    expect(Radio(0)).toHaveAttribute('type', 'radio');
    expect(Radio(0)).toHaveAttribute('name', 'list');
    expect(Radio(0)).toHaveAttribute('value', `${DATA[0].value}`);
  });

  it('defaultValue가 주어지지 않을 경우 첫번째 라디오 버튼이 선택되어 있어야 한다.', () => {
    const { Radio } = renderRadio();

    expect(Radio(0)).toBeChecked();
    expect(Radio(1)).not.toBeChecked();
    expect(Radio(2)).not.toBeChecked();
  });

  it('defaultValue가 주어진 경우 해당 라디오 버튼이 선택되어 있어야 한다.', () => {
    const { Radio } = renderRadio({ defaultValue: '2개' });

    expect(Radio(0)).not.toBeChecked();
    expect(Radio(1)).toBeChecked();
    expect(Radio(2)).not.toBeChecked();
  });

  it('라디오 버튼을 클릭하면 해당 라디오 버튼이 선택된다.', async () => {
    const { clickRadio, Radio } = renderRadio();

    await clickRadio(1);

    expect(Radio(0)).not.toBeChecked();
    expect(Radio(1)).toBeChecked();
    expect(Radio(2)).not.toBeChecked();
  });

  it('라디오 버튼을 클릭하면 이벤트가 올바르게 호출된다.', async () => {
    const { DATA, clickRadio, mockOnChange, RadioGroup } = renderRadio();

    await clickRadio(2);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenLastCalledWith(DATA[2].value);

    await clickRadio(0);
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenLastCalledWith(DATA[0].value);

    await clickRadio(1);
    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(RadioGroup()).toHaveFormValues({ list: DATA[1].value });
  });
});
