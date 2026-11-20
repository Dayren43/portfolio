<script>
	import { onDestroy } from 'svelte';

	// A miniature of the real dashboard, in its own palette.
	// Readings are a real 24h snapshot from the living-room sensor (20-minute averages,
	// 15:50 on 12 Nov 2026 to 15:50 on 13 Nov 2026), not a live feed.
	const TEMP = [22.0, 22.08, 22.18, 22.27, 22.16, 22.23, 22.3, 22.36, 22.39, 22.46, 22.41, 22.5, 22.5, 22.48, 22.39, 22.22, 22.27, 22.3, 22.39, 22.43, 22.39, 22.46, 22.32, 22.2, 22.2, 22.14, 22.12, 22.09, 22.09, 22.1, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 21.99, 21.97, 21.93, 21.96, 21.95, 21.95, 21.93, 21.91, 21.91, 21.91, 21.9, 21.94, 22.06, 22.02, 22.02, 22.0, 22.0, 21.96, 22.0, 22.0, 21.98, 21.99, 21.96, 21.96, 21.91, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.84, 21.89, 21.95, 22.16, 22.2, 22.2];
	const HUMID = [37.7, 37.8, 37.8, 37.7, 38.4, 38.6, 38.3, 38.1, 37.9, 37.7, 37.6, 37.5, 37.4, 37.3, 37.3, 37.3, 37.2, 37.3, 37.1, 37.0, 36.9, 36.7, 36.7, 36.7, 36.8, 36.9, 36.9, 37.1, 37.2, 37.1, 37.1, 37.1, 37.2, 37.1, 37.0, 36.9, 36.8, 36.8, 36.7, 36.5, 36.4, 36.2, 36.1, 36.2, 36.0, 35.9, 35.8, 35.7, 36.6, 36.4, 36.0, 35.8, 35.8, 35.7, 35.6, 35.4, 35.3, 35.2, 35.2, 35.2, 35.2, 35.3, 35.3, 35.4, 35.3, 35.3, 35.2, 35.3, 35.3, 35.2, 35.2, 35.1, 34.9];
	// Same apparent-temperature formula the dashboard uses.
	const FEELS = TEMP.map((t, i) => t + 0.33 * ((HUMID[i] / 100) * 6.105 * Math.exp((17.27 * t) / (237.7 + t))) - 4);

	const C_TEMP = '#f5b8a4', C_HUMID = '#a8c8e8', C_FEELS = '#c8d8b0', C_COMFORT = '#9bc9a8';

	// The chart stretches to whatever shape the panel is, so it is drawn in a 0–100 box.
	const N = TEMP.length;
	const xAt = (/** @type {number} */ i) => (i / (N - 1)) * 100;
	const yT = (/** @type {number} */ v) => 100 - ((v - 19.5) / 5) * 100; // 19.5–24.5 °C
	const yH = (/** @type {number} */ v) => 100 - ((v - 28) / 20) * 100; // 28–48 %

	const line = (/** @type {number[]} */ vals, /** @type {(v: number) => number} */ y) =>
		vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ');
	const tempLine = line(TEMP, yT);
	const tempFill = `${tempLine} L100 100 L0 100 Z`;
	const feelsLine = line(FEELS, yT);
	const humidLine = line(HUMID, yH);

	const now = TEMP[N - 1];
	const [whole, frac] = now.toFixed(1).split('.');

	// The snapshot starts at 15:50, so 22:00 and 06:00 sit at these fractions of the 24h.
	const NIGHT_START = 0.257, NIGHT_END = 0.59;

	// Draw the lines in from the left, then let the "now" dot pulse.
	let tick = $state(0);
	const ticker = setInterval(() => { tick += 1; }, 50);
	onDestroy(() => clearInterval(ticker));
	const reveal = $derived(Math.min(1, tick / 36));
	const eased = $derived(1 - Math.pow(1 - reveal, 3));
</script>

<div class="tp">
	<div class="tp-head">
		<div class="tp-now">
			<span class="tp-big">{whole}<span class="tp-frac">.{frac}</span><span class="tp-unit">°C</span></span>
			<span class="tp-mood">Comfortable</span>
		</div>
		<div class="tp-legend">
			<span><i style="background: {C_TEMP}"></i>Temp</span>
			<span><i style="background: {C_FEELS}"></i>Feels</span>
			<span><i style="background: {C_HUMID}"></i>Humidity</span>
		</div>
	</div>

	<div class="tp-chart">
		<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<defs>
				<linearGradient id="tp-grad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color={C_TEMP} stop-opacity="0.4"/>
					<stop offset="100%" stop-color={C_TEMP} stop-opacity="0"/>
				</linearGradient>
				<clipPath id="tp-reveal">
					<rect x="0" y="0" width={100 * eased} height="100"/>
				</clipPath>
			</defs>

			<!-- Overnight band -->
			<rect x={NIGHT_START * 100} y="0" width={(NIGHT_END - NIGHT_START) * 100} height="100" fill="rgba(110,130,180,0.10)"/>

			<!-- Comfort band 20–24° -->
			<rect x="0" y={yT(24)} width="100" height={yT(20) - yT(24)} fill={C_COMFORT} opacity="0.05"/>
			{#each [20, 24] as v}
				<line x1="0" y1={yT(v)} x2="100" y2={yT(v)} stroke={C_COMFORT} stroke-opacity="0.4"
					stroke-dasharray="2 5" stroke-width="1" vector-effect="non-scaling-stroke"/>
			{/each}

			<g clip-path="url(#tp-reveal)">
				<path d={tempFill} fill="url(#tp-grad)"/>
				<path d={humidLine} fill="none" stroke={C_HUMID} stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
				<path d={feelsLine} fill="none" stroke={C_FEELS} stroke-width="1.2" stroke-dasharray="3 3" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
				<path d={tempLine} fill="none" stroke={C_TEMP} stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
			</g>
		</svg>
		{#if reveal >= 1}
			<span class="tp-dot" style="top: {yT(now)}%; background: {C_TEMP}; color: {C_TEMP}"></span>
		{/if}
	</div>

	<div class="tp-axis">
		<span style="left: 0">15:50</span>
		<span style="left: {NIGHT_START * 100}%">22:00</span>
		<span style="left: {NIGHT_END * 100}%">06:00</span>
		<span style="right: 0">now</span>
	</div>
</div>

<style>
	.tp {
		align-self: stretch;
		width: 100%;
		display: flex; flex-direction: column;
		padding: 12px 14px 10px;
	}
	.tp-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
	.tp-now { display: flex; align-items: baseline; gap: 14px; }
	.tp-big {
		font-family: 'Instrument Serif', serif;
		font-size: 60px; line-height: 0.9; letter-spacing: -0.03em;
		color: #f5b8a4;
	}
	.tp-frac { font-size: 0.55em; color: rgba(245, 235, 224, 0.5); }
	.tp-unit { font-size: 0.32em; font-style: italic; color: rgba(245, 235, 224, 0.5); margin-left: 4px; letter-spacing: 0; }
	.tp-mood { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 20px; color: #f5ebe0; }
	.tp-legend {
		display: flex; gap: 12px; padding-bottom: 4px;
		font-family: 'JetBrains Mono', monospace; font-size: 10px;
		letter-spacing: 0.08em; text-transform: uppercase;
		color: rgba(245, 235, 224, 0.5);
	}
	.tp-legend span { display: inline-flex; align-items: center; gap: 5px; }
	.tp-legend i { width: 6px; height: 6px; border-radius: 50%; }
	.tp-chart { position: relative; flex: 1; min-height: 90px; margin-top: 12px; }
	.tp-chart svg { position: absolute; inset: 0; width: 100%; height: 100%; }
	.tp-dot {
		position: absolute; right: -4px;
		width: 8px; height: 8px; margin-top: -4px; border-radius: 50%;
		animation: tp-pulse 2.4s ease-out infinite;
	}
	@keyframes tp-pulse {
		0% { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 45%, transparent); }
		100% { box-shadow: 0 0 0 9px transparent; }
	}
	.tp-axis {
		position: relative; height: 12px; margin-top: 6px;
		font-family: 'JetBrains Mono', monospace; font-size: 9.5px;
		letter-spacing: 0.08em; text-transform: uppercase;
		color: rgba(245, 235, 224, 0.32);
	}
	.tp-axis span { position: absolute; top: 0; }
	@media (max-width: 480px) {
		.tp-big { font-size: 46px; }
		.tp-mood { display: none; }
		.tp-legend { gap: 8px; font-size: 9px; }
	}
</style>
