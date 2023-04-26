<script lang="ts">
	import { storeCurrentUrl } from '$lib/stores';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	// 设置nav样式
	$: classesActive = (route) => ($storeCurrentUrl?.includes(route) ? 'primary' : 'secondary');
</script>

<div class="doc">
	<div class="nav">
		{#each Object.keys(data.navs) as nav1}
			<details open>
				<summary>{nav1}</summary>
				<aside>
					<nav>
						<ul>
							{#each data.navs[nav1] as nav2}
								<li>
									<a
										class={classesActive('/docs/' + nav1 + '/' + nav2)}
										href={'/docs/' + nav1 + '/' + nav2}>{nav2}</a
									>
								</li>
							{/each}
						</ul>
					</nav>
				</aside>
			</details>
		{/each}
	</div>

	<main class="page">
		<div class="phonenav">
			<details>
				<summary>目录</summary>
				{#each Object.keys(data.navs) as nav1}
					<aside>
						<div class="sub">{nav1}</div>
						<nav>
							<ul>
								{#each data.navs[nav1] as nav2}
									<li>
										<a
											class={classesActive('/docs/' + nav1 + '/' + nav2)}
											href={'/docs/' + nav1 + '/' + nav2}>{nav2}</a
										>
									</li>
								{/each}
							</ul>
						</nav>
					</aside>
				{/each}
			</details>
		</div>

		<slot />
	</main>
</div>

<style>
	.doc {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		overflow: hidden;
		overflow-x: hidden;
	}

	.page {
		margin-left: 1rem;
		flex: 1;
		height: 100%;
		min-width: 300px;
		overflow: auto;
		overflow-x: hidden;
	}

	.nav {
		height: 100%;
		margin-top: 2rem;
		min-width: 150px;
		max-width: 250px;
		flex: auto;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.nav nav > ul {
		margin-left: 1rem;
	}

	.sub {
		color: var(--accordion-open-summary-color);
		padding-bottom: 8px;
		border-bottom: var(--border-width) solid var(--accordion-border-color);
	}

	.phonenav {
		display: none;
	}

	.phonenav aside li,
	a {
		padding-top: 4px;
		padding-bottom: 0;
	}

	.phonenav details {
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.phonenav nav > ul {
		margin-left: 1rem;
	}

	@media screen and (max-width: 1200px) {
		.nav {
			max-width: 200px;
		}
	}

	@media screen and (max-width: 768px) {
		.nav {
			max-width: 150px;
		}
	}

	@media screen and (max-width: 576px) {
		.nav {
			display: none;
		}
		.phonenav {
			display: block;
		}

		.page {
			margin-left: 0;
		}
	}
</style>
