# 8주차

## 요구사항

- 메뉴 목록 조회 API 응답에 `openHour`, `closeHour` 추가
  - `openHour`, `closeHour`는 가게의 운영시간을 나타냅니다.
  - `GET /api/store/:storeId`
  ```ts
  {
    openHour: number;
    closeHour: number;
    storeMenu: MenuList[];
  }
  ```
- 메뉴 선택 페이지 스펙 추가
  - 현재 시간이 운영시간에 해당하면 `운영중`, 해당하지 않으면 `운영종료`를 화면 최상단에 노출합니다.
  - 예를 들어 `openHour`: 9, `closeHour`: 22 일 때,
    - 8시 59분에는 `운영종료`
    - 9시 00분에는 `운영중`
    - 21시 59분에는 `운영중`
    - 22시 00분에는 `운영종료`
