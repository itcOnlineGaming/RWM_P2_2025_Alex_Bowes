<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import BreathingMethods from '$lib/Breathing_Methods_Selection/Breathing_methods.svelte';
	import { sceneStore } from '$lib/stores/sceneStore';
	import { onMount } from 'svelte';
	
	let selectedScene: 'beach' | 'forest' | null = null;
	let backgroundImage = '';
	
	onMount(() => {
		sceneStore.subscribe(value => {
			selectedScene = value;
			if (value === 'beach') {
				backgroundImage = `${base}/ASSETS/Beach-Scence (1).png`;
			} else if (value === 'forest') {
				backgroundImage = `${base}/ASSETS/Forest-Scence (1).png`;
			}
		});
	});
	
	function goBack() {
		goto(`${base}/Choose_scene`);
	}
	
	function handleStart() {
		goto(`${base}/meditation`);
	}
</script>

<div class="container" style="background-image: url('{backgroundImage}');">
	<div class="top-section">
		<h1 class="title">Select Breathing Method</h1>
		<div class="dropdown-wrapper">
			<BreathingMethods />
		</div>
	</div>
	
	<div class="bottom-section">
		<h2 class="message">Please be Seated Comfortably</h2>
		<div class="button-container">
			<button class="action-button start-button" on:click={handleStart}>start</button>
			<button class="action-button back-button" on:click={goBack}>Back</button>
		</div>
	</div>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0 !important;
		padding: 0 !important;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	
	.top-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		gap: 2rem;
		background: transparent;
	}
	
	.title {
		font-size: 2.5rem;
		font-weight: 700;
		color: white;
		text-align: center;
		margin: 0;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
	}
	
	.dropdown-wrapper {
		display: flex;
		justify-content: center;
	}
	
	.bottom-section {
		background: transparent;
		padding: 3rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		min-height: 40vh;
		justify-content: center;
	}
	
	.message {
		font-size: 2rem;
		font-weight: 600;
		color: white;
		text-align: center;
		margin: 0;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
	}
	
	.button-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
	
	.action-button {
		padding: 0.9rem 3rem;
		border-radius: 50px;
		font-size: 1.3rem;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		min-width: 200px;
		text-transform: lowercase;
	}
	
	.start-button {
		background: linear-gradient(135deg, #ff8c5a 0%, #ff6b3d 100%);
		color: white;
	}
	
	.start-button:hover {
		background: linear-gradient(135deg, #ff7a48 0%, #ff5a2b 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
	}
	
	.back-button {
		background: linear-gradient(135deg, #ff8c5a 0%, #ff6b3d 100%);
		color: white;
	}
	
	.back-button:hover {
		background: linear-gradient(135deg, #ff7a48 0%, #ff5a2b 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
	}
	
	@media (max-width: 768px) {
		.title {
			font-size: 2rem;
		}
		
		.message {
			font-size: 1.5rem;
		}
		
		.action-button {
			font-size: 1.1rem;
			padding: 0.8rem 2.5rem;
			min-width: 180px;
		}
	}
</style>
