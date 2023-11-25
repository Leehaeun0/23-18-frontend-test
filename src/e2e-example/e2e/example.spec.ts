import { test, expect } from '@playwright/test';

test('counter increment', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const title = page.getByRole('heading', { name: /Home/ });

  await expect(title).toBeVisible();

  await page.getByRole('link', { name: /counter/ }).click();

  await expect(page.getByText('count: 0')).toBeVisible();

  const incrementButton = page.getByRole('button', { name: /increment/ });

  await incrementButton.click();
  await incrementButton.click();

  await expect(page.getByText('count: 2')).toBeVisible();
});
