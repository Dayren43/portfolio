<script>
	import { onDestroy } from 'svelte';

	let t    = $state(0);
	let now  = $state(new Date());
	const ticker  = setInterval(() => { t += 1; },           80);
	const clockTick = setInterval(() => { now = new Date(); }, 60_000);
	onDestroy(() => { clearInterval(ticker); clearInterval(clockTick); });

	const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
	const timeStr = $derived(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
	const dayName = $derived(now.toLocaleDateString('en-GB', { weekday: 'long' }));
	const dateStr = $derived(
		now.getDate() + ' ' + now.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()
	);

	// Chart geometry
	const L = 28, R = 242, T = 30, B = 118;
	const W = R - L, H = B - T;
	const Y_MIN = 18, Y_MAX = 28;
	const N = 50;

	const yScale = (/** @type {number} */ v) => B - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * H;
	const xAt    = (/** @type {number} */ i) => L + (i / (N - 1)) * W;

	const pts = $derived((() => {
		return Array.from({ length: N }, (_, i) => {
			const base = 22.5;
			const slow = Math.sin((i / N) * Math.PI * 1.8 + t * 0.018) * 1.2;
			const fast = Math.sin((i / N) * Math.PI * 5   + t * 0.05)  * 0.35;
			return base + slow + fast;
		});
	})());

	const tempLine = $derived(
		pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)} ${yScale(v).toFixed(1)}`).join(' ')
	);
	const tempFill = $derived(
		tempLine + ` L${R} ${B} L${L} ${B} Z`
	);

	// Night bands (fixed positions, just visual)
	const NIGHT = [
		{ x: L,          w: W * 0.12 },
		{ x: L + W*0.52, w: W * 0.22 },
	];

	// Y-axis ticks
	const Y_TICKS = [20, 22, 24, 26];
	// X-axis labels
	const X_LABELS = ['08:00', '12:00', '16:00', '20:00', '00:00'];
</script>

<svg viewBox="0 0 260 140" class="prv-svg" preserveAspectRatio="xMidYMid meet">
	<defs>
		<linearGradient id="tp-grad" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%"   stop-color="var(--hot)" stop-opacity="0.38"/>
			<stop offset="100%" stop-color="var(--hot)" stop-opacity="0"/>
		</linearGradient>
		<clipPath id="tp-clip">
			<rect x={L} y={T} width={W} height={H}/>
		</clipPath>
	</defs>

	<!-- Background -->
	<rect x="14" y="14" width="232" height="112" rx="6"
		fill="oklch(0.18 0.007 60)" stroke="var(--border)"/>

	<!-- Head: range tabs -->
	<rect x="20" y="17" width="96" height="11" rx="5"
		fill="oklch(0.14 0.006 60)" stroke="var(--border-soft)" stroke-width="0.5"/>
	{#each [['6h',0],['24h',1],['3d',2],['7d',3]] as [label, i]}
		{#if i === 1}
			<rect x={21 + i*24} y="18" width="22" height="9" rx="4"
				fill="var(--surface)"/>
		{/if}
		<text x={32 + i*24} y="25.5" class="prv-tiny" text-anchor="middle"
			fill={i === 1 ? 'var(--ink)' : 'var(--ink-4)'}>{label}</text>
	{/each}

	<!-- Y-axis labels -->
	{#each Y_TICKS as v}
		<text x={L - 4} y={yScale(v) + 3.5} class="prv-tiny" text-anchor="end"
			fill="oklch(0.72 0.16 35 / 0.45)">{v}°</text>
		<line x1={L} y1={yScale(v)} x2={R} y2={yScale(v)}
			stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
	{/each}

	<!-- Comfort band 20–24° -->
	<g clip-path="url(#tp-clip)">
		<rect x={L} y={yScale(24)} width={W} height={yScale(20) - yScale(24)}
			fill="oklch(0.78 0.14 145 / 0.06)"/>
		<line x1={L} y1={yScale(24)} x2={R} y2={yScale(24)}
			stroke="oklch(0.78 0.14 145)" stroke-opacity="0.3" stroke-dasharray="2 4" stroke-width="0.6"/>
		<line x1={L} y1={yScale(20)} x2={R} y2={yScale(20)}
			stroke="oklch(0.78 0.14 145)" stroke-opacity="0.3" stroke-dasharray="2 4" stroke-width="0.6"/>
	</g>

	<!-- Night bands -->
	<g clip-path="url(#tp-clip)">
		{#each NIGHT as b}
			<rect x={b.x} y={T} width={b.w} height={H}
				fill="rgba(60,76,110,0.18)"/>
		{/each}
	</g>

	<!-- Temp area + line -->
	<g clip-path="url(#tp-clip)">
		<path d={tempFill} fill="url(#tp-grad)"/>
		<path d={tempLine} fill="none"
			stroke="var(--hot)" stroke-width="1.6"
			stroke-linecap="round" stroke-linejoin="round"/>
	</g>

	<!-- Live dot at end of line -->
	<circle cx={xAt(N-1)} cy={yScale(pts[pts.length-1])} r="2.5" fill="var(--hot)"/>

	<!-- X-axis labels -->
	{#each X_LABELS as label, i}
		<text x={L + (i / (X_LABELS.length - 1)) * W} y={B + 10}
			class="prv-tiny" text-anchor="middle" fill="rgba(245,235,224,0.3)">{label}</text>
	{/each}

	<!-- Footer stats -->
	<line x1="20" y1="130" x2="240" y2="130" stroke="var(--border-soft)" stroke-width="0.5"/>
	<text x="22" y="137" class="prv-tiny" fill="var(--ink-4)">min <tspan fill="var(--hot)">21.3°</tspan></text>
	<text x="76" y="137" class="prv-tiny" fill="var(--ink-4)">max <tspan fill="var(--hot)">24.5°</tspan></text>
	<text x="136" y="137" class="prv-tiny" fill="var(--ink-4)">avg humidity <tspan fill="var(--cool)">40%</tspan></text>
</svg>
