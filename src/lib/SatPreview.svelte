<script>
	import { onDestroy } from 'svelte';

	let t = $state(0);
	const ticker = setInterval(() => {
		t += 1;
	}, 60);
	onDestroy(() => clearInterval(ticker));

	// Illustrative only: orbit radius is exaggerated so the shells read at this size.
	const CX = 130, CY = 64, R_GLOBE = 34, R_ORBIT = 48;
	const TILT = (22 * Math.PI) / 180;
	const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
	const rad = (/** @type {number} */ d) => (d * Math.PI) / 180;

	const POLAR = 'var(--cool)';
	const INCLINED = 'var(--hot)';
	const plane = (/** @type {number} */ inc, /** @type {number} */ raan, /** @type {string} */ color) => ({ inc: rad(inc), raan: rad(raan), color });

	const MODES = [
		{
			name: 'POLAR', perPlane: 6, note: 'crowds the poles',
			planes: [0, 45, 90, 135].map((r) => plane(87, r, POLAR))
		},
		{
			name: 'INCLINED', perPlane: 6, note: 'never reaches the poles',
			planes: [0, 90, 180, 270].map((r) => plane(53, r, INCLINED))
		},
		{
			name: 'MIXED', perPlane: 4, note: 'even global coverage',
			planes: [
				...[0, 60, 120].map((r) => plane(87, r, POLAR)),
				...[30, 150, 270].map((r) => plane(53, r, INCLINED))
			]
		}
	];

	// 77 ticks × 60ms ≈ 4.6s per layout; three layouts fill one 13.8s preview slot.
	const MODE_TICKS = 77;
	const mode = $derived(MODES[Math.floor(t / MODE_TICKS) % MODES.length]);

	/** Unit vector on an orbit with inclination `inc`, ascending node `raan`, at angle `u`. */
	function orbit(/** @type {number} */ inc, /** @type {number} */ raan, /** @type {number} */ u) {
		const cu = Math.cos(u), su = Math.sin(u);
		return [
			Math.cos(raan) * cu - Math.sin(raan) * su * Math.cos(inc),
			Math.sin(raan) * cu + Math.cos(raan) * su * Math.cos(inc),
			su * Math.sin(inc)
		];
	}

	/** Orthographic projection with the north pole tipped toward the viewer; d > 0 is the near side. */
	function project(/** @type {number[]} */ [x, y, z], /** @type {number} */ r) {
		return { x: CX + r * x, y: CY - r * (z * cosT - y * sinT), d: y * cosT + z * sinT };
	}

	/** Path through the points, optionally keeping only near-side segments. */
	function path(/** @type {{x: number, y: number, d: number}[]} */ pts, frontOnly = false) {
		let out = '', pen = false;
		for (const p of pts) {
			if (frontOnly && p.d < 0) { pen = false; continue; }
			out += `${pen ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
			pen = true;
		}
		return out;
	}

	const STEPS = Array.from({ length: 61 }, (_, i) => (i / 60) * Math.PI * 2);

	const rings = $derived(
		mode.planes.map((p) => {
			const pts = STEPS.map((u) => project(orbit(p.inc, p.raan, u), R_ORBIT));
			return { color: p.color, all: path(pts), front: path(pts, true) };
		})
	);

	const sats = $derived(
		mode.planes.flatMap((p, pi) =>
			Array.from({ length: mode.perPlane }, (_, k) => {
				const u = (k / mode.perPlane) * Math.PI * 2 + pi * 0.45 + t * 0.03;
				return { ...project(orbit(p.inc, p.raan, u), R_ORBIT), color: p.color };
			})
		)
	);

	// Graticule: fixed parallels, meridians drifting slowly so the globe appears to turn.
	const parallels = [-60, -30, 0, 30, 60].map((lat) => {
		const c = Math.cos(rad(lat)), s = Math.sin(rad(lat));
		return path(STEPS.map((l) => project([c * Math.cos(l), c * Math.sin(l), s], R_GLOBE)), true);
	});
	const meridians = $derived(
		[0, 30, 60, 90, 120, 150].map((lon) =>
			path(STEPS.map((u) => project(orbit(Math.PI / 2, rad(lon) + t * 0.004, u), R_GLOBE)), true)
		)
	);
</script>

<div class="rc-frame">
	<div class="rc-toggle">
		{#each MODES as m}
			<span class="rc-pill" class:on={m === mode}>{m.name}</span>
		{/each}
	</div>

	<svg viewBox="0 0 260 130" class="prv-svg" preserveAspectRatio="xMidYMid meet">
		<defs>
			<radialGradient id="sat-globe" cx="38%" cy="32%" r="75%">
				<stop offset="0%" stop-color="oklch(0.30 0.02 230)"/>
				<stop offset="100%" stop-color="oklch(0.15 0.01 230)"/>
			</radialGradient>
		</defs>

		<!-- Far side: full rings and satellites, dimmed; the globe then covers what it should -->
		{#each rings as r}
			<path d={r.all} fill="none" stroke={r.color} stroke-width="0.5" opacity="0.22"/>
		{/each}
		{#each sats as s}
			{#if s.d < 0}
				<circle cx={s.x} cy={s.y} r="1.3" fill={s.color} opacity="0.35"/>
			{/if}
		{/each}

		<!-- Globe -->
		<circle cx={CX} cy={CY} r={R_GLOBE} fill="url(#sat-globe)" stroke="var(--border)" stroke-width="0.8"/>
		{#each parallels as d}
			<path {d} fill="none" stroke="var(--ink-3)" stroke-width="0.35" opacity="0.4"/>
		{/each}
		{#each meridians as d}
			<path {d} fill="none" stroke="var(--ink-3)" stroke-width="0.35" opacity="0.4"/>
		{/each}

		<!-- Near side -->
		{#each rings as r}
			<path d={r.front} fill="none" stroke={r.color} stroke-width="0.7" opacity="0.6"/>
		{/each}
		{#each sats as s}
			{#if s.d >= 0}
				<circle cx={s.x} cy={s.y} r="3.4" fill={s.color} opacity="0.16"/>
				<circle cx={s.x} cy={s.y} r="1.6" fill={s.color}/>
			{/if}
		{/each}

		<!-- Legend -->
		<circle cx="16" cy="18" r="2" fill={POLAR}/>
		<text x="22" y="20.5" class="prv-tiny" fill="var(--ink-3)">polar</text>
		<circle cx="16" cy="29" r="2" fill={INCLINED}/>
		<text x="22" y="31.5" class="prv-tiny" fill="var(--ink-3)">inclined</text>

		<text x={CX} y="126" class="prv-cap" text-anchor="middle" fill="var(--ink-3)">
			{mode.planes.length} planes · {mode.planes.length * mode.perPlane} sats ·
			<tspan fill="var(--ink)">{mode.note}</tspan>
		</text>
	</svg>
</div>
