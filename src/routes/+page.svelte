<script>
	import TopBar from '$lib/TopBar.svelte';
	import Hero from '$lib/Hero.svelte';
	import ProjectChannel from '$lib/ProjectChannel.svelte';
	import Experience from '$lib/Experience.svelte';
	import About from '$lib/About.svelte';
	import { PROJECTS } from '$lib/data.js';

	let openId = $state('CH-01');

	const today = new Date().toLocaleDateString('en-CA');
	const year = new Date().getFullYear();
</script>

<div class="shell">
	<TopBar />
	<Hero />

	<div class="section-head">
		<h2><span class="idx">02 ·</span>Projects</h2>
		<span class="subtitle">3 projects</span>
	</div>

	<div class="channels">
		{#each PROJECTS as p}
			<ProjectChannel
				{p}
				open={openId === p.id}
				onToggle={() => (openId = openId === p.id ? null : p.id)}
			/>
		{/each}
	</div>

	<Experience />
	<About />

	<footer class="footer">
		<span>ISAK FORSGREN</span>
		<span>{year}</span>
	</footer>
</div>
