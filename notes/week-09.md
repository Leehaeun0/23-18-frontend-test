# 9주차

## End-to-end testing

- [playwright로](https://playwright.dev/) e2e테스트 하기

### 환경 구성

- `e2e-example` 디렉토리에 있는 설정 파일들을 복사
  - `index.html`
  - `playwright.config.ts`
  - `vite-env.d.ts`
  - `vite.config.ts`
- `playwright.config.ts`의 `command` 옵션 수정
  - npm script는 작성해 뒀습니다.

### 테스트 작성

- `e2e` 디렉토리 생성 후, 테스트 코드 작성

### 테스트 실행

- `npm run test:e2e:{name}`
- `npm run test:e2e:{name} -- --headed`
- `npm run test:e2e:{name} -- --ui`
- `npm run test:e2e:{name} -- --debug`
