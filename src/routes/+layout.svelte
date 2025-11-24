<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(html) {
		margin: 0;
		padding: 0;
		height: 100%;
		overflow: hidden;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
	
	:global(*) {
		box-sizing: border-box;
	}
</style>
