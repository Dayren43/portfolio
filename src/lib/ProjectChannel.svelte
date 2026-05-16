<script>
	/** @type {{ p: import('./data.js').PROJECTS[number], open: boolean, onToggle: () => void }} */
	let { p, open, onToggle } = $props();
</script>

<article class="channel" class:featured={p.featured} class:open>
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="channel-row"
		onclick={onToggle}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onToggle();
			}
		}}
		role="button"
		tabindex="0"
	>
		<div class="channel-id">
			<span>{p.id}</span>
			<span class="signal" aria-hidden="true">
				<span></span><span></span><span></span><span></span>
			</span>
		</div>

		<div class="channel-main">
			<h3>
				{p.title}
				{#if p.badge}<span class="badge">{p.badge}</span>{/if}
			</h3>
			<p class="desc">{p.desc}</p>
		</div>

		<div class="channel-stats">
			{#each p.stats as [k, v]}
				<div>
					<div class="stat-key">{k}</div>
					<div class="stat-val">{v}</div>
				</div>
			{/each}
		</div>

		<div class="channel-cta">
			<a
				class="btn"
				class:btn-hot={p.featured}
				href={p.href}
				target="_blank"
				rel="noreferrer"
				onclick={(e) => e.stopPropagation()}
			>
				<span>VIEW REPO</span>
				<span class="caret">↗</span>
			</a>
			<button
				class="btn"
				onclick={(e) => {
					e.stopPropagation();
					onToggle();
				}}
			>
				<span>{open ? 'COLLAPSE' : 'DETAILS'}</span>
				<span class="caret">{open ? '—' : '+'}</span>
			</button>
		</div>
	</div>

	<div class="channel-expand">
		<div class="expand-grid">
			<div>
				<h4>// notes</h4>
				<ul>
					{#each p.notes as note}
						<li>{note}</li>
					{/each}
				</ul>
				<h4 style="margin-top: 18px">// stack</h4>
				<div class="stack-tags">
					{#each p.stack as s}
						<span class="t">{s}</span>
					{/each}
				</div>
			</div>
			<div>
				<h4>// languages</h4>
				<div class="lang-bar">
					{#each p.langs as [n, pct, c]}
						<div style="width: {pct}%; background: {c}" title="{n} {pct}%"></div>
					{/each}
				</div>
				<div class="lang-legend">
					{#each p.langs as [n, pct, c]}
						<span><span class="sw" style="background: {c}"></span>{n} {pct}%</span>
					{/each}
				</div>
				<h4 style="margin-top: 18px">// channel meta</h4>
				<div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--ink-2); line-height: 1.7">
					<div>code: <span style="color: var(--ink)">{p.code}</span></div>
					<div>link: <a href={p.href} target="_blank" rel="noreferrer" style="color: var(--hot)">{p.href.replace('https://', '')}</a></div>
				</div>
			</div>
		</div>
	</div>
</article>
