const SampleData1 = {
  name: '[국내산갈비] 전통 돼지갈비찜',
  isPopular: true,
  description: '1인분에만 밥이 포함되어있습니다 기본구성은 석박지+김+갈비찜입니다',
  review: 215,
  optionSelect: true,
  selectList: [
    {
      name: '1인분(밥포함)',
      price: 18000,
    },
    {
      name: '소(2~3인분)',
      price: 30000,
    },
    {
      name: '중(3~4인분)',
      price: 45000,
    },
  ],
  image: '음식1.jpg',
  minOrderPrice: 9900,
  defaultPrice: 0,
};

const SampleData2 = {
  name: '스팸구이',
  isPopular: false,
  description: '스팸 4조각, 밥도둑',
  review: 6,
  optionSelect: false,
  selectList: [],
  image: '음식2.jpg',
  minOrderPrice: 9900,
  defaultPrice: 5000,
};
