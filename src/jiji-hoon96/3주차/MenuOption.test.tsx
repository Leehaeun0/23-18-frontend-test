import { render } from '@testing-library/react';
import { MenuOption } from './MenuOption';
import { userEvent } from '@testing-library/user-event';
import { MenuOptionsProps } from './types';
import { sampleData } from './mockData';

let commonProps: MenuOptionsProps;

const renderMenuOption = (props: MenuOptionsProps) => {
  return render(<MenuOption {...props} />);
};

beforeEach(() => {
  commonProps = { ...sampleData };
});

describe('랜더링 테스트', () => {
  it('데이터가 정상적으로 출력되는지 테스트', () => {
    const { getByText } = renderMenuOption(commonProps);
    const textArray = [
      commonProps.name,
      commonProps.description,
      '수량',
      '가격',
      '메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.',
      '배달최소금액',
    ];

    textArray.forEach((text) => {
      expect(getByText(text)).toBeInTheDocument();
    });

    commonProps.selectList.forEach((element) => {
      expect(getByText(element.price)).toBeInTheDocument();
      expect(getByText(element.name)).toBeInTheDocument();
    });
  });

  it('가장 아래에는 장바구니에 담기 버튼이 있고 ${최종가격}형태로 버튼이 있습니다.', () => {
    const { getByRole } = renderMenuOption(commonProps);
    const addButton = getByRole('button', { name: /.*원 담기/i });
    expect(addButton).toBeInTheDocument();
  });

  describe('이미지 랜더링 테스트', () => {
    it('이미지가 존재하는지 테스트', () => {
      const { getByAltText } = renderMenuOption(commonProps);

      const imgElement = getByAltText(commonProps.name);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', commonProps.image);
    });
    it('이미지가 없으면 baseURL 이 이미지를 대체하는지 테스트', () => {
      const commonPropsWithoutImage = { ...commonProps, image: null };
      const { queryByRole } = render(<MenuOption {...commonPropsWithoutImage} />);
      const imgElement = queryByRole('img');

      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', 'baseURL');
      expect(imgElement).toHaveAttribute('alt', commonPropsWithoutImage.name);
    });
  });

  describe('<인기> 랜더링 테스트', () => {
    const renderAndExpect = (isPopular = true) => {
      const { getByText, queryByText } = renderMenuOption({
        ...commonProps,
        isPopular: isPopular,
      });

      const popularTag = isPopular ? getByText('인기') : queryByText('인기');
      const menuName = getByText(commonProps.name);
      const description = getByText(commonProps.description);

      expect(menuName).toBeInTheDocument();
      expect(description).toBeInTheDocument();

      isPopular ? expect(popularTag).toBeInTheDocument() : expect(popularTag).toBeNull();
    };

    it('<인기> 표시, 메뉴이름, 설명을 보여줍니다', () => {
      renderAndExpect(true);
      expect(true).toBe(true);
    });

    it('<인기> 가 없을 때 <인기> 태그를 보여주지 않습니다', () => {
      renderAndExpect(false);
      expect(true).toBe(true);
    });
  });

  describe('가격 옵션 랜더링 테스트', () => {
    it('가격 옵션이 여러개인 경우', () => {
      const { getByText, getAllByLabelText } = renderMenuOption(commonProps);

      const labels = getAllByLabelText(/labelList/i);
      expect(labels).toHaveLength(3);

      commonProps.selectList.forEach((option) => {
        const optionName = getByText(option.name);
        expect(optionName).toBeInTheDocument();

        const optionPrice = getByText(option.price.toString());
        expect(optionPrice).toBeInTheDocument();
      });
    });

    it('가격 옵션이 하나밖에 없는 경우', () => {
      const { queryByRole } = render(<MenuOption {...{ ...sampleData, optionSelect: false }} />);
      const optionList = queryByRole('list');
      expect(optionList).toBeNull();
    });

    it('가격 목록 아래에 라디오 버튼으로 보여줘야 함', () => {
      const { getByRole } = renderMenuOption(commonProps);
      const selectList = commonProps.selectList;

      selectList.forEach((option) => {
        const radio = getByRole('radio', { name: option.name });
        expect(radio).toBeInTheDocument();
      });
    });
  });
});

describe('기능 테스트', () => {
  describe('수량 기능 테스트', () => {
    it('수량을 선택할 수 있습니다.', async () => {
      const user = userEvent.setup();

      const { getByRole, queryByRole } = renderMenuOption(commonProps);
      const decrementButton = getByRole('button', { name: 'decreaseBtn' });
      const increaseButton = getByRole('button', { name: 'increaseBtn' });
      const countSpan = queryByRole('span', { name: 'countSpan' });
      await user.click(increaseButton);
      expect(countSpan).toHaveTextContent('2');
      await user.click(decrementButton);
      expect(countSpan).toHaveTextContent('1');
    });

    it('클릭하여 숫자를 조절할 수 있으며, 최소 값은 1입니다.', async () => {
      const { getByLabelText } = renderMenuOption(commonProps);
      const user = userEvent.setup();

      const decreaseButton = getByLabelText('decreaseBtn');
      const increaseButton = getByLabelText('increaseBtn');
      const countSpan = getByLabelText('countSpan');

      expect(Number(countSpan.textContent)).toBeGreaterThanOrEqual(1);

      await user.click(decreaseButton);
      expect(Number(countSpan.textContent)).toBeGreaterThanOrEqual(1);

      await user.click(increaseButton);
      expect(Number(countSpan.textContent)).toBeGreaterThanOrEqual(1);
    });
  });

  describe('가격 옵션 기능 테스트', () => {
    it('처음에 첫 번째 라디오 버튼이 선택되어 있어야 한다.', () => {
      const { getByRole } = renderMenuOption(commonProps);
      expect(getByRole('radio', { name: commonProps.selectList[0].name })).toBeChecked();
      expect(getByRole('radio', { name: commonProps.selectList[1].name })).not.toBeChecked();
      expect(getByRole('radio', { name: commonProps.selectList[2].name })).not.toBeChecked();
      expect(getByRole('radiogroup')).toHaveFormValues({ menu: '18000' });
    });

    it('라디오 버튼을 클릭하면 해당 버튼이 선택되어야 한다.', async () => {
      const user = userEvent.setup();
      const { getByRole } = renderMenuOption(commonProps);
      const radioButton = getByRole('radio', { name: commonProps.selectList[1].name });

      await user.click(radioButton);

      expect(radioButton).toBeChecked();

      expect(getByRole('radiogroup')).toHaveFormValues({ menu: '30000' });
    });
  });
});
