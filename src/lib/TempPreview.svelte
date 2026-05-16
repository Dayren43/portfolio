<script>
	import { onDestroy } from 'svelte';

	let t = $state(0);
	const ticker = setInterval(() => {
		t += 1;
	}, 90);
	onDestroy(() => clearInterval(ticker));

	const pts = $derived((() => {
		const N = 28;
		const result = [];
		for (let i = 0; i < N; i++) {
			const x = 20 + (i / (N - 1)) * 220;
			const wave =
				Math.sin((i + t * 0.4) * 0.4) * 8 + Math.sin((i + t * 0.15) * 0.18) * 14;
			const y = 78 - wave * 0.5;
			result.push([x, y]);
		}
		return result;
	})());

	const linePath = $derived(
		pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
	);
	const fillPath = $derived(
		linePath + ` L ${pts[pts.length - 1][0]} 110 L ${pts[0][0]} 110 Z`
	);
	const last = $derived(pts[pts.length - 1]);
	const reading = $derived((21.0 + Math.sin(t * 0.07) * 0.6).toFixed(1));
</script>

<svg viewBox="0 0 260 140" class="prv-svg" preserveAspectRatio="xMidYMid meet">
	<defs>
		<linearGradient id="temp-fill" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="var(--hot)" stop-opacity="0.35" />
			<stop offset="100%" stop-color="var(--hot)" stop-opacity="0" />
		</linearGradient>
	</defs>

	<rect x="14" y="14" width="232" height="112" rx="6" fill="oklch(0.20 0.008 60)" stroke="var(--border)" />

	<line x1="20" y1="50" x2="240" y2="50" stroke="var(--border-soft)" stroke-dasharray="1 3" />
	<line x1="20" y1="78" x2="240" y2="78" stroke="var(--border-soft)" stroke-dasharray="1 3" />
	<line x1="20" y1="106" x2="240" y2="106" stroke="var(--border-soft)" stroke-dasharray="1 3" />

	<text x="20" y="24" class="prv-tiny" fill="var(--ink-3)">SENSOR · esp32-c3 · indoor</text>
	<text x="240" y="24" class="prv-tiny" fill="var(--ink-3)" text-anchor="end">24h</text>

	<path d={fillPath} fill="url(#temp-fill)" />
	<path d={linePath} fill="none" stroke="var(--hot)" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" />
	<circle cx={last[0]} cy={last[1]} r="2.6" fill="var(--hot)" />
	<circle cx={last[0]} cy={last[1]} r="5" fill="var(--hot)" opacity="0.25" />

	<text x="216" y="60" class="prv-big" fill="var(--ink)" text-anchor="end">
		{reading}<tspan class="prv-unit" fill="var(--ink-3)">°C</tspan>
	</text>
	<text x="216" y="72" class="prv-tiny" fill="var(--good)" text-anchor="end">▲ stable · 23m ago</text>
</svg>
