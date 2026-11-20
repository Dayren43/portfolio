# Portfolio site

SvelteKit + Vite, built with adapter-node and served by Docker Compose (service `portfolio`,
`Dockerfile.dev`) at http://localhost:4173. This server is headless; no Node on the host.

## Visual-check loop

After every code change, work through these steps without waiting for the user. Only
hand back when the result looks right at both widths and the console is clean.

1. `docker compose up --build -d`, then `curl -s -o /dev/null -w '%{http_code}' http://localhost:4173` returns 200.
2. Check it in the browser using the `playwright` MCP tools: dockerized headless Chromium,
   default viewport 1280x800, local-scope config in `~/.claude.json`.
   - `browser_navigate` to http://localhost:4173, then `browser_take_screenshot` (use `fullPage` for the whole page).
   - `browser_resize` to 390x844, reload, and screenshot again for mobile.
   - Use `browser_console_messages` for errors and warnings, `browser_network_requests` for 4xx/5xx,
     and `browser_snapshot` for the DOM/accessibility tree.
   - The browser runs with `--network host`, so `localhost` is the host.
3. Fallback, or for a one-shot report (desktop + mobile, console, failed requests, horizontal overflow):
   ```
   docker run --rm --network host --entrypoint node -v "$PWD/.claude:/work:ro" \
     -v "$HOME/.cache/playwright-mcp:/out" mcr.microsoft.com/playwright/mcp /work/visual-check.mjs [url] [/path,/other]
   ```
   Screenshots go to `~/.cache/playwright-mcp/`. Read the `-N.png` tiles, because the full-page
   shots are too tall to read once downscaled.
4. Fix and repeat.

## Git

- Only commit when asked.
