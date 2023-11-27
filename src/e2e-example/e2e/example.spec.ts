import { test, expect } from '@playwright/test';

test('counter increment', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 페이지 제목 찾기
  const title = page.getByRole('heading', { name: /Home/ });

  await expect(title).toBeVisible();

  // API로 받아온 내용 찾기
  const 마라로제 = page.getByText('마라로제');

  await expect(마라로제).toBeVisible();

  // 페이지 이동
  await page.getByRole('link', { name: /counter/ }).click();

  // 카운터 초기값 확인
  await expect(page.getByText('count: 0')).toBeVisible();

  // 카운터 증가 버튼 클릭
  const incrementButton = page.getByRole('button', { name: /increment/ });

  await incrementButton.click();
  await incrementButton.click();

  // 카운터 값 확인
  await expect(page.getByText('count: 2')).toBeVisible();
});
