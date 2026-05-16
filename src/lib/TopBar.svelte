<script>
	import { onDestroy } from 'svelte';

	let now = $state(new Date());
	const tick = setInterval(() => {
		now = new Date();
	}, 1000);
	onDestroy(() => clearInterval(tick));

	const clockTime = $derived(
		now.toLocaleTimeString('sv-SE', { timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit', second: '2-digit' })
	);
</script>

<div class="topbar">
	<div class="right">
		<span>Stockholm</span>
		<span class="clock">{clockTime}</span>
	</div>
</div>
