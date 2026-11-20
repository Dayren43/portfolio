// Headless visual check: screenshots at desktop + mobile widths and a console/error report.
// Runs inside the Playwright MCP image (no Node needed on the host):
//   docker run --rm --network host --entrypoint node \
//     -v "$PWD/.claude:/work:ro" -v "$HOME/.cache/playwright-mcp:/out" \
//     mcr.microsoft.com/playwright/mcp /work/visual-check.mjs [url] [path]
import { createRequire } from 'node:module';
const { chromium } = createRequire('/app/')('playwright');

const url = process.argv[2] ?? 'http://localhost:4173';
const paths = (process.argv[3] ?? '/').split(',');
const viewports = {
	desktop: { viewport: { width: 1280, height: 800 } },
	mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
};

const browser = await chromium.launch({ channel: 'chromium', args: ['--no-sandbox'] }); // image ships full chromium, not headless-shell
let problems = 0;
for (const path of paths) {
	for (const [name, opts] of Object.entries(viewports)) {
		const page = await (await browser.newContext(opts)).newPage();
		const log = [];
		page.on('console', (m) => log.push(`[${m.type()}] ${m.text()}`));
		page.on('pageerror', (e) => log.push(`[pageerror] ${e.message}`));
		page.on('requestfailed', (r) => log.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
		page.on('response', (r) => r.status() >= 400 && log.push(`[http ${r.status()}] ${r.url()}`));

		const res = await page.goto(new URL(path, url).href, { waitUntil: 'networkidle' });
		await page.waitForTimeout(500); // let entrance animations settle
		const slug = path.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'index';
		const file = `/out/${slug}-${name}.png`;
		await page.screenshot({ path: file, fullPage: true });
		// Full-page shots get downscaled into illegibility when viewed, so also save readable tiles
		const { width, height } = opts.viewport;
		const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
		const tileHeight = Math.round(height * 1.25);
		const tiles = [];
		for (let y = 0, i = 1; y < pageHeight; y += tileHeight, i++) {
			const tile = `/out/${slug}-${name}-${i}.png`;
			await page.screenshot({ path: tile, fullPage: true, clip: { x: 0, y, width, height: Math.min(tileHeight, pageHeight - y) } });
			tiles.push(tile);
		}
		const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);

		problems += log.filter((l) => !l.startsWith('[log]') && !l.startsWith('[info]') && !l.startsWith('[debug]')).length + overflowX;
		console.log(`== ${path} @ ${name}: HTTP ${res?.status()}, title "${await page.title()}"`);
		console.log(`   screenshot: ${file.replace('/out', '~/.cache/playwright-mcp')} (+ ${tiles.length} tiles: ${slug}-${name}-1..${tiles.length}.png)`);
		if (overflowX) console.log('   WARNING: horizontal overflow');
		for (const l of log) console.log(`   ${l}`);
		await page.context().close();
	}
}
await browser.close();
console.log(problems ? `${problems} problem(s) found` : 'clean: no console errors/warnings, failed requests or overflow');
