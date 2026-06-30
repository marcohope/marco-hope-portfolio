import { test, expect } from "@playwright/test";

/**
 * Smoke tests for /blogs — currently a "coming soon" cloudscape. Confirm the
 * page renders its headline and the primary nav marks the route as current.
 * (The essays exist as preview-only drafts; the public index is the coming-soon
 * page.) Runs under the reduced-motion context from playwright.config.
 */

test("blogs renders the coming-soon page", async ({ page }) => {
  await page.goto("/blogs");
  await expect(
    page.getByRole("heading", { level: 1, name: "Coming soon" }),
  ).toBeVisible();
});

test("primary nav marks Blogs as current", async ({ page }) => {
  await page.goto("/blogs");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Blogs" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});
