// Renders cv/cv.html to static/isak-forsgren-cv.pdf with the Playwright MCP image (no Node on the host):
//   docker run --rm --user "$(id -u):$(id -g)" --entrypoint node -v "$PWD/cv:/cv:ro" -v "$PWD/static:/out" \
//     mcr.microsoft.com/playwright/mcp /cv/render.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire('/app/')('playwright');

const browser = await chromium.launch({ channel: 'chromium', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('file:///cv/cv.html');
await page.pdf({ path: '/out/isak-forsgren-cv.pdf', format: 'A4', preferCSSPageSize: true });
await browser.close();
console.log('wrote static/isak-forsgren-cv.pdf');
