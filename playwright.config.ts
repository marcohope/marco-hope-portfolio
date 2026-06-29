import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

/**
 * Smoke-test config for the craft demos. Deliberately lightweight: Chromium
 * only (these are mount-and-respond checks, not cross-browser visual tests) and
 * run against a production build, which is how the site actually ships. The
 * webServer block builds + starts Next automatically, and reuses an already
 * running dev/prod server locally so repeat runs are fast.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    // Run under reduced motion: the scroll-reveal wrappers then render content
    // statically (no visibility:hidden-until-scrolled), so below-the-fold demos
    // are immediately assertable, and the demos exercise their instant-tween
    // path. Keeps these mount-and-respond checks deterministic. (Set via
    // contextOptions — reducedMotion lives on BrowserContextOptions in this
    // @playwright/test version, not the top-level `use`.)
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run start",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
