<script>
	import { onDestroy } from 'svelte';

	let t = $state(0);
	let active = $state(true);
	let userPinned = $state(false);

	const ticker = setInterval(() => {
		t += 1;
	}, 60);
	onDestroy(() => clearInterval(ticker));

	const MA = { x: 22, y: 28, w: 100, h: 70 };
	const MB = { x: 138, y: 28, w: 100, h: 70 };
	const CYCLE_MS = 170;

	const cycle = $derived((t % CYCLE_MS) / CYCLE_MS);
	const cycleIndex = $derived(Math.floor(t / CYCLE_MS));
	const inSeam = $derived(cycle >= 0.42 && cycle <= 0.58);

	$effect(() => {
		if (!userPinned) active = cycleIndex % 2 === 0;
	});

	const startY = MA.y + MA.h * 0.55;
	const wrongY = MB.y + MB.h * 0.18;

	const eased = $derived((() => {
		if (cycle < 0.42) return cycle;
		if (cycle < 0.58)
			return 0.42 + (cycle - 0.42) * 0.4 + 0.06 * Math.sin(((cycle - 0.42) / 0.16) * Math.PI);
		return cycle;
	})());

	const cx = $derived((() => {
		if (eased < 0.42) {
			const p = eased / 0.42;
			return MA.x + 8 + p * (MA.w - 16);
		} else if (eased < 0.58) {
			const p = (eased - 0.42) / 0.16;
			return MA.x + MA.w + p * (MB.x - (MA.x + MA.w));
		} else {
			const p = (eased - 0.58) / 0.42;
			return MB.x + 8 + p * (MB.w - 16);
		}
	})());

	const cy = $derived((() => {
		if (eased < 0.42) {
			const p = eased / 0.42;
			return startY - Math.sin(p * Math.PI) * 4;
		} else if (eased < 0.58) {
			const p = (eased - 0.42) / 0.16;
			return active ? startY : startY + (wrongY - startY) * p;
		} else {
			const p = (eased - 0.58) / 0.42;
			const baseY = active ? startY : wrongY;
			return baseY + Math.sin(p * Math.PI) * 4;
		}
	})());

	const ghostY = $derived(
		active
			? startY + (wrongY - startY) * Math.min(1, Math.max(0, (cycle - 0.42) / 0.16))
			: startY
	);
	const ghostVisible = $derived(inSeam || (cycle > 0.58 && cycle < 0.72));
	const flash = $derived(inSeam ? Math.sin(((cycle - 0.42) / 0.16) * Math.PI) : 0);
	const snapPx = $derived(Math.round(Math.abs(startY - wrongY) * 6));
	const seamMidX = $derived((MA.x + MA.w + MB.x) / 2);
	const snapMidY = $derived((startY + wrongY) / 2);

	/** @param {MouseEvent} e */
	function pinWithout(e) {
		e.stopPropagation();
		userPinned = true;
		active = false;
	}
	/** @param {MouseEvent} e */
	function pinWith(e) {
		e.stopPropagation();
		userPinned = true;
		active = true;
	}
	/** @param {MouseEvent} e */
	function resetPin(e) {
		e.stopPropagation();
		userPinned = false;
	}
</script>

<div class="rc-frame">
	<div class="rc-toggle">
		<button class="rc-pill" class:on={!active} onclick={pinWithout}>WITHOUT</button>
		<button class="rc-pill" class:on={active} onclick={pinWith}>WITH RUSTCURSOR</button>
		{#if userPinned}
			<button class="rc-reset" onclick={resetPin} title="auto-cycle">↻</button>
		{/if}
	</div>

	<svg viewBox="0 0 260 130" class="prv-svg" preserveAspectRatio="xMidYMid meet">
		<defs>
			<pattern id="grid-hi" width="5" height="5" patternUnits="userSpaceOnUse">
				<path d="M5 0H0V5" fill="none" stroke="var(--border-soft)" stroke-width="0.4" />
			</pattern>
			<pattern id="grid-lo" width="8" height="8" patternUnits="userSpaceOnUse">
				<path d="M8 0H0V8" fill="none" stroke="var(--border-soft)" stroke-width="0.4" />
			</pattern>
			<radialGradient id="seam-glow-on" cx="50%" cy="50%" r="50%">
				<stop offset="0%" stop-color="oklch(0.78 0.16 145)" stop-opacity="0.55" />
				<stop offset="100%" stop-color="oklch(0.78 0.16 145)" stop-opacity="0" />
			</radialGradient>
			<radialGradient id="seam-glow-off" cx="50%" cy="50%" r="50%">
				<stop offset="0%" stop-color="oklch(0.78 0.18 25)" stop-opacity="0.65" />
				<stop offset="100%" stop-color="oklch(0.78 0.18 25)" stop-opacity="0" />
			</radialGradient>
		</defs>

		<!-- Seam glow -->
		<ellipse
			cx={seamMidX}
			cy={startY}
			rx={28 + flash * 8}
			ry={36 + flash * 6}
			fill={active ? 'url(#seam-glow-on)' : 'url(#seam-glow-off)'}
			opacity={flash}
		/>

		<!-- Monitor A -->
		<rect x={MA.x} y={MA.y} width={MA.w} height={MA.h} rx="4" fill="oklch(0.20 0.008 60)" stroke="var(--border)" />
		<rect x={MA.x} y={MA.y} width={MA.w} height={MA.h} rx="4" fill="url(#grid-hi)" />
		<text x={MA.x + 4} y={MA.y + 9} class="prv-tiny" fill="var(--ink-3)">27" · 2560×1440</text>
		<rect x={MA.x + 38} y={MA.y + MA.h + 4} width="24" height="3" rx="1" fill="var(--border)" />

		<!-- Monitor B -->
		<rect x={MB.x} y={MB.y} width={MB.w} height={MB.h} rx="4" fill="oklch(0.20 0.008 60)" stroke="var(--border)" />
		<rect x={MB.x} y={MB.y} width={MB.w} height={MB.h} rx="4" fill="url(#grid-lo)" />
		<text x={MB.x + 4} y={MB.y + 9} class="prv-tiny" fill="var(--ink-3)">27" · 1920×1080</text>
		<rect x={MB.x + 38} y={MB.y + MB.h + 4} width="24" height="3" rx="1" fill="var(--border)" />

		<!-- Physical-Y guide (WITH mode) -->
		{#if active}
			<line
				x1={MA.x + 8} y1={startY} x2={MB.x + MB.w - 8} y2={startY}
				stroke="oklch(0.78 0.16 145)" stroke-dasharray="2 3" stroke-width="0.8"
				opacity={0.35 + 0.5 * flash}
			/>
			<text x={seamMidX} y={startY - 6} class="prv-cap" text-anchor="middle"
				fill="oklch(0.78 0.16 145)" opacity={flash}>PHYSICAL-Y · LOCKED</text>
		{/if}

		<!-- Snap path (WITHOUT mode) -->
		{#if !active}
			<path
				d={`M ${MA.x + MA.w} ${startY} Q ${seamMidX} ${snapMidY - 6}, ${MB.x} ${wrongY}`}
				fill="none" stroke="oklch(0.78 0.18 25)" stroke-width="1.2"
				stroke-dasharray="1.5 2" opacity={0.5 + 0.5 * flash}
			/>
			<text x={seamMidX} y={snapMidY - 10} class="prv-cap" text-anchor="middle"
				fill="oklch(0.85 0.19 25)" opacity={flash}>SNAP ↗ {snapPx}px</text>
		{/if}

		<!-- Ghost cursor -->
		{#if ghostVisible}
			<g opacity={0.32}>
				<path
					d={`M${cx} ${ghostY} l 0 9 l 2.5 -2 l 2 4.5 l 1.8 -0.8 l -2 -4.4 l 3.4 0 z`}
					fill={active ? 'oklch(0.78 0.18 25)' : 'var(--ink-2)'}
					stroke="var(--bg)" stroke-width="0.5"
				/>
			</g>
		{/if}

		<!-- Cursor glow + arrow -->
		<circle
			cx={cx} cy={cy} r={6 + 5 * flash}
			fill={active ? 'oklch(0.78 0.16 145 / .22)' : 'oklch(0.78 0.18 25 / .22)'}
		/>
		<path
			d={`M${cx} ${cy} l 0 9 l 2.5 -2 l 2 4.5 l 1.8 -0.8 l -2 -4.4 l 3.4 0 z`}
			fill={active ? 'var(--hot)' : 'oklch(0.85 0.19 25)'} stroke="var(--bg)" stroke-width="0.6"
		/>

		<!-- Crossing badge -->
		{#if flash > 0.15}
			<g opacity={flash}>
				<rect
					x={seamMidX - 26} y="113" width="52" height="11" rx="5.5"
					fill={active ? 'oklch(0.78 0.16 145 / .18)' : 'oklch(0.78 0.18 25 / .18)'}
					stroke={active ? 'oklch(0.78 0.16 145)' : 'oklch(0.85 0.19 25)'} stroke-width="0.5"
				/>
				<text
					x={seamMidX} y="120.5" class="prv-cap" text-anchor="middle"
					fill={active ? 'oklch(0.86 0.16 145)' : 'oklch(0.92 0.19 25)'}
				>{active ? '✓ CROSSING · SMOOTH' : '✗ CROSSING · SNAP'}</text>
			</g>
		{/if}
	</svg>
</div>
