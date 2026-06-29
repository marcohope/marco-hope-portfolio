import { test } from "@playwright/test";

test("diagnose account button", async ({ page }) => {
  await page.goto("/craft");
  await page.waitForLoadState("networkidle");
  const account = page.getByRole("button", { name: "Account", exact: true });
  const count = await account.count();
  console.log("ACCOUNT COUNT:", count);
  await account.scrollIntoViewIfNeeded().catch((e) => console.log("SCROLL ERR:", e.message));
  const box = await account.boundingBox();
  console.log("BOX:", JSON.stringify(box));
  const info = await account.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const atPoint = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      visibility: cs.visibility,
      opacity: cs.opacity,
      display: cs.display,
      scrollY: window.scrollY,
      innerH: window.innerHeight,
      topElTag: atPoint?.tagName,
      topElText: atPoint?.textContent?.slice(0, 30),
    };
  });
  console.log("INFO:", JSON.stringify(info, null, 2));
});
