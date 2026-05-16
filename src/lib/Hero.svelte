<script>
	import PreviewsPanel from './PreviewsPanel.svelte';
</script>

<section class="hero">
	<div class="hero-card">
		<span class="eyebrow"><span class="tick"></span> CURRENTLY ONLINE · PORTFOLIO READOUT</span>
		<h1 class="name">
			Isak Forsgren<br />
			builds <em>small, sharp</em><br />
			tools.
		</h1>
		<p class="tagline">
			Embedded systems, low-level tools and the bits in between. Currently chasing pixels across
			mismatched monitors and milliKelvins across a sensor mesh.
		</p>
		<div class="hero-meta">
			<span class="chip"><span class="dot" style="background: var(--good)"></span>Open to Rust &amp; embedded roles</span>
			<span class="chip"><span class="dot"></span>Rust · C++ · Embedded</span>
			<span class="chip"><span class="dot"></span>MSc Computer Engineering · LTU '25</span>
		</div>
	</div>

	<PreviewsPanel />
</section>
