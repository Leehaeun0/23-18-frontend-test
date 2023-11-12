# 7주차

## 서버 통신 적용

### 목표

- 서버와 HTTP 통신하는 기능을 구현합니다.
- msw를 활용하여 API 응답을 mocking 해봅니다.

### 요구사항

- 인터페이스에 `id` 추가

```diff
interface MenuList {
+ id: string;
  title: string;
  menus: Menu[];
}

interface Menu {
+ id: string;
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  description?: string;
  image?: string;
  isPopular: boolean;
  tags: string[];
}
```

- 추가된 API를 사용하여, 데이터를 서버에서 받아오도록 수정합니다.
  - 메뉴 목록 조회 
    - `GET /api/store/:storeId`
    - 아무 `storeId`를 전달해도 응답값은 고정입니다.
    - 응답 형태
    ```ts
    {
      storeMenu: MenuList[]
    }
    ```
  - 단일 메뉴 조회 
    - `GET /api/store/:storeId/menu/:menuId`
    - DB에 없는 `storeId`, `menuId`를 전달하면 404 상태코드를 응답합니다.
    - 응답 형태
    ```ts
    {
      menu: Menu
    }
    ```
- 스냅샷 테스트 해보기
  - https://jestjs.io/docs/snapshot-testing
