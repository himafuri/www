import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export interface LoginOptions {
  page: Page;
  serverURL?: string;
  user: {
    email: string;
    password: string;
  };
}

/**
 * Logs the user into the admin panel via the login page.
 */
export async function login({
  page,
  serverURL = "http://localhost:3000",
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`);

  const emailField = page.locator("#field-email");
  const passwordField = page.locator("#field-password");

  await expect(emailField).toBeVisible({ timeout: 90_000 });
  await emailField.fill(user.email);
  await passwordField.fill(user.password);
  await page.click('button[type="submit"]');

  await page.waitForURL(`${serverURL}/admin`);

  const dashboardArtifact = page.locator('span[title="Dashboard"]');
  await expect(dashboardArtifact).toBeVisible();
}
