// Served per request so the Sitemap line always points at whatever domain the site is on.
// Content-Signal follows https://contentsignals.org: search and AI answers may use the page,
// model training may not.
export function GET({ url }) {
	const body = [
		'User-agent: *',
		'Content-Signal: search=yes, ai-input=yes, ai-train=no',
		'Allow: /',
		'',
		`Sitemap: ${url.origin}/sitemap.xml`,
		''
	].join('\n');

	return new Response(body, {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' }
	});
}
