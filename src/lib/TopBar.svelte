<script>
	import { onDestroy } from 'svelte';

	let now = $state(new Date());
	const tick = setInterval(() => {
		now = new Date();
	}, 1000);
	onDestroy(() => clearInterval(tick));

	const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
	const utcTime = $derived(
		`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`
	);
</script>

<div class="topbar">
	<div class="left">
		<span class="led" aria-hidden="true"></span>
		<span class="brand"><b>DAYREN</b> · SYSTEMS &amp; TOOLS</span>
		<span class="pill mono">node-01 · online</span>
	</div>
	<div class="right">
		<span>📍 SE · LULEÅ</span>
		<span>BUILD v0.4.2</span>
		<span class="clock">{utcTime}</span>
	</div>
</div>
