// Served per request so the URLs use whatever domain the site is on.
const PATHS = ['/', '/isak-forsgren-cv.pdf'];

export function GET({ url }) {
	const urls = PATHS.map((p) => `\t<url><loc>${url.origin}${p}</loc></url>`).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' }
	});
}
