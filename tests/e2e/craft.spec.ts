import { test, expect } from "@playwright/test";

/**
 * Smoke tests for the /craft lab. These confirm each interactive demo mounts and
 * responds to its primary gesture — open/close, select, expand — rather than
 * asserting pixels or timings. If a demo throws on mount or its core control
 * stops working, these fail.
 */

test.beforeEach(async ({ page }) => {
  await page.goto("/craft");
});

test("page renders all three experiments", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1, name: "Craft" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Liquid Glass nav" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Drag-to-dismiss sheet" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Origin-aware popover" })).toBeVisible();
});

test("liquid-glass nav selects the clicked item", async ({ page }) => {
  const nav = page.getByRole("navigation", { name: "Demo navigation" });
  const work = nav.getByRole("button", { name: "Work" });
  await expect(work).not.toHaveAttribute("aria-current", "page");
  await work.click();
  await expect(work).toHaveAttribute("aria-current", "page");
});

test("drag sheet opens and closes", async ({ page }) => {
  await page.getByRole("button", { name: "Open sheet" }).click();
  const sheet = page.getByRole("dialog", { name: "Draggable demo sheet" });
  await expect(sheet).toBeVisible();
  await page.getByRole("button", { name: "Close sheet" }).click();
  await expect(sheet).toBeHidden();
});

test("origin popover opens from its trigger and closes on Escape", async ({ page }) => {
  const account = page.getByRole("button", { name: "Account", exact: true });
  await account.click();
  const popover = page.getByRole("dialog", { name: "Account options" });
  await expect(popover).toBeVisible();
  await expect(account).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();
  await expect(account).toHaveAttribute("aria-expanded", "false");
});

test("build-breakdown details expand", async ({ page }) => {
  const firstBreakdown = page.getByRole("group").filter({ hasText: "Build breakdown" }).first();
  await expect(firstBreakdown).not.toHaveJSProperty("open", true);
  await firstBreakdown.getByText("Build breakdown").click();
  await expect(firstBreakdown).toHaveJSProperty("open", true);
});
