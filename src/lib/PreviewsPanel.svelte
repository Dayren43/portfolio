<script>
	import { onDestroy } from 'svelte';
	import RustCursorPreview from './RustCursorPreview.svelte';
	import TempPreview from './TempPreview.svelte';

	const PREVIEWS = [
		{
			id: 'CH-01',
			title: 'RustCursor',
			sub: 'multi-monitor cursor remap · live · 2 DUA',
			component: RustCursorPreview
		},
		{
			id: 'CH-02',
			title: 'Temp-logging',
			sub: 'ESP32-C3 → Svelte dashboard · the design source',
			component: TempPreview
		}
	];

	let idx = $state(0);
	let paused = $state(false);

	const ticker = setInterval(() => {
		if (!paused) idx = (idx + 1) % PREVIEWS.length;
	}, 6000);
	onDestroy(() => clearInterval(ticker));

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
		<span>NOW SHOWING · {current.id}</span>
		<span class="prv-dots" role="tablist">
			{#each PREVIEWS as _, i}
				<button
					class="prv-dot"
					class:on={i === idx}
					onclick={() => (idx = i)}
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
