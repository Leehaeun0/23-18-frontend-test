# 8주차

## 요구사항

- 메뉴 목록 조회 API 응답에 `openHour`, `closeHour` 추가
  - `openHour`, `closeHour`는 가게의 영업시간을 나타냅니다.
  - `GET /api/store/:storeId`
  ```diff
  {
  + openHour: number;
  + closeHour: number;
    storeMenu: MenuList[];
  }
  ```
- 메뉴 선택 페이지 스펙 추가
  - 현재 시간이 영업시간에 해당하면 `영업중`, 해당하지 않으면 `영업종료`를 화면 최상단에 노출합니다.
  - 예를 들어 `openHour`: 9, `closeHour`: 22 일 때,
    - 8시 59분에는 `영업종료`
    - 9시 00분에는 `영업중`
    - 21시 59분에는 `영업중`
    - 22시 00분에는 `영업종료`
- 화면 예시
  - <img width="392" alt="image" src="https://github.com/Learning-Is-Vital-In-Development/23-18-frontend-test/assets/40662323/884fba18-6adf-4310-aeaa-117225518a4f">
