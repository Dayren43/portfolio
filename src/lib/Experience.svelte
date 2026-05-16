<script>
	import { EXPERIENCE } from './data.js';
</script>

<section>
	<div class="section-head">
		<h2><span class="idx">03 ·</span>Experience</h2>
		<span class="subtitle">{EXPERIENCE.length} entries · chronological feed</span>
	</div>

	<ol class="exp-feed">
		{#each EXPERIENCE as e}
			<li class="exp-row" class:active={e.status === 'active'}>
				<div class="exp-rail">
					<span class="exp-dot" aria-hidden="true"></span>
					<span class="exp-line" aria-hidden="true"></span>
				</div>
				<div class="exp-when">
					<span class="exp-range">{e.range}</span>
					<span class="exp-dur">{e.duration}</span>
				</div>
				<div class="exp-body">
					<div class="exp-head">
						<span class="exp-company">{e.company}</span>
						<span class="exp-role">{e.role}</span>
						{#if e.status === 'active'}
							<span class="exp-live"><span class="led-sm" aria-hidden="true"></span>live</span>
						{/if}
					</div>
					<p class="exp-blurb">{e.blurb}</p>
					<p class="exp-detail">{e.detail}</p>
					<div class="stack-tags">
						{#each e.tags as tag}
							<span class="t">{tag}</span>
						{/each}
					</div>
				</div>
			</li>
		{/each}
	</ol>
</section>
