<script>
	import { onDestroy } from 'svelte';
	import RustCursorPreview from './RustCursorPreview.svelte';
	import TempPreview from './TempPreview.svelte';

	// Temp: 8s, RustCursor: 1 full WITH+WITHOUT cycle (115 ticks × 60ms × 2 ≈ 13.8s)
	const PREVIEWS = [
		{ title: 'Temp-logging',  sub: 'ESP32-C3 → Svelte dashboard · the design source',      component: TempPreview,       duration: 8000  },
		{ title: 'RustCursor',    sub: 'multi-monitor cursor remap · live',                    component: RustCursorPreview, duration: 13800 }
	];

	let idx    = $state(0);
	let paused = $state(false);

	function schedule() {
		return setTimeout(() => {
			if (!paused) idx = (idx + 1) % PREVIEWS.length;
			timer = schedule();
		}, PREVIEWS[idx].duration);
	}

	let timer = schedule();
	onDestroy(() => clearTimeout(timer));

	const current = $derived(PREVIEWS[idx]);
</script>

<div
	class="previews"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	role="region"
	aria-label="Project previews"
>
	<div class="readings-head">
		<span>NOW SHOWING · {current.title.toUpperCase()}</span>
		<span class="prv-dots" role="tablist">
			{#each PREVIEWS as _, i}
				<button
					class="prv-dot"
					class:on={i === idx}
					onclick={() => { idx = i; }}
					aria-label={`Preview ${i + 1}`}
				></button>
			{/each}
		</span>
	</div>

	{#key idx}
		<div class="prv-stage">
			<current.component />
		</div>
	{/key}

	<div class="prv-foot">
		<span class="prv-title">{current.title}</span>
		<span class="prv-sub">{current.sub}</span>
	</div>
</div>
