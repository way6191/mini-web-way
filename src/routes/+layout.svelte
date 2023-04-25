<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import { storeCurrentUrl } from '$lib/stores';
	import '$lib/style.css';

	afterNavigate(() => {
		storeCurrentUrl.set($page.url.pathname);
	});
</script>

<div class="app">
	<Header />

	<main class="content">
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		height: 100%;
		display: flex;
		flex-direction: column;
		margin: 0 12px;
	}

	.content {
		height: 80%;
		flex: 1;
	}
</style>
