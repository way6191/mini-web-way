<script lang="ts">
	let theme = true;

	async function toggleThime() {
		const htmlele = document.querySelector('html');
		if (!theme) {
			htmlele?.setAttribute('data-theme', 'dark');
		} else {
			htmlele?.setAttribute('data-theme', 'light');
		}
	}
</script>

<header>
	<nav class="nav">
		<ul>
			<li><a href="/">主页</a></li>
		</ul>
		<ul>
			<li><a href="/docs">文档</a></li>
			<li><a href="/blog">博客</a></li>
			<input type="checkbox" role="switch" bind:checked={theme} on:change={toggleThime} />
		</ul>
	</nav>
</header>

<style>
	header {
		flex: none;
	}
	.nav {
		display: flex;
		justify-content: space-between;
	}
</style>
