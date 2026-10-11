import { test, expect } from "@playwright/test";

test("serves published content as HTML without React hydration", async ({
  browser,
  request,
}) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Himpunan Mahasiswa Furry Indonesia");
  expect(html).not.toContain("<astro-island");

  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveTitle("HIMAFURI");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Himpunan Mahasiswa Furry Indonesia",
  );
  await expect(
    page.getByRole("heading", { name: "Visi", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: ".scratch/emdash-migration/desktop.png",
    fullPage: true,
  });
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(page.locator("details").first()).toContainText(
    "Lorem ipsum dolor sit amet",
  );
  await context.close();
});

test("persists the theme across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Ganti ke mode gelap" }).click();
  await expect(page.locator("html")).toHaveClass("dark");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Ganti ke mode terang" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Ganti ke mode terang" }).click();
  await expect(page.locator("html")).not.toHaveClass("dark");
});

test("keeps a single FAQ open and supports keyboard input", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("summary").first().press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.locator("summary").nth(1).press("Enter");
  await expect(page.locator("details[open]")).toHaveCount(1);
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});

test("loads all images and fits a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  const layout = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.width);
  await expect(
    page.getByRole("button", { name: "Bahasa Inggris belum tersedia" }),
  ).toBeDisabled();
  await page.screenshot({
    path: ".scratch/emdash-migration/mobile.png",
    fullPage: true,
  });
});

test("redirects the old admin URL and protects content writes", async ({
  request,
}) => {
  const redirect = await request.get("/admin", { maxRedirects: 0 });
  expect(redirect.status()).toBe(302);
  expect(redirect.headers().location).toBe("/_emdash/admin/");
  const response = await request.patch(
    "/_emdash/api/content/homepage/homepage",
    { data: { data: { heading: "unauthorized change" } } },
  );
  expect([401, 403]).toContain(response.status());
});
