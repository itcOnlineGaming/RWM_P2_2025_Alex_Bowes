<script>
	import { onMount, onDestroy } from 'svelte';
	import BreathingAnimation from './BreathingAnimation.svelte';

	// Props
	export let duration = 300; // Session duration in seconds (default 5 min)
	export let breathingMethod = 'box'; // Which breathing method
	export let scene = 'beach'; // Background scene
	export let audioUrl = null; // Optional audio URL
	export let onComplete = null; // Callback when complete
	export let showSkip = true; // Show skip button
	export let autoStart = true; // Auto-start meditation
	
	let breathingComponent;
	let started = autoStart;
	let completed = false;
	let audioElement = null;
	let fadeTransition = false;

	onMount(() => {
		if (audioUrl && audioElement && autoStart) {
			audioElement.play();
		}
	});

	onDestroy(() => {
		if (audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0;
		}
	});

	function startMeditation() {
		started = true;
		if (breathingComponent) {
			breathingComponent.start();
		}
		if (audioElement && audioUrl) {
			audioElement.play();
		}
	}

	function handleComplete() {
		completed = true;
		if (audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0;
		}
		if (onComplete) {
			onComplete({
				duration,
				breathingMethod,
				scene,
				completed: true
			});
		}
	}

	function skipMeditation() {
		completed = true;
		if (breathingComponent) {
			breathingComponent.stop();
		}
		if (audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0;
		}
		if (onComplete) {
			onComplete({
				duration,
				breathingMethod,
				scene,
				completed: false,
				skipped: true
			});
		}
	}
</script>

{#if audioUrl}
	<audio bind:this={audioElement} src={audioUrl} loop preload="auto"></audio>
{/if}

<div class="meditation-timer" class:fade={fadeTransition}>
	{#if !started}
		<h1 class="ready-text">Ready to Begin Meditation</h1>
		<button class="action-button" on:click={startMeditation}>Start</button>
	{:else}
		<BreathingAnimation 
			bind:this={breathingComponent}
			{duration}
			method={breathingMethod}
			showTimer={true}
			autoStart={autoStart}
			on:complete={handleComplete}
		/>
	{/if}

	{#if started && !completed && showSkip}
		<button class="skip-button" on:click={skipMeditation}>Skip</button>
	{/if}
</div>

<style>
	.meditation-timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
		position: relative;
		transition: opacity 0.5s ease;
	}

	.meditation-timer.fade {
		animation: fadeBackground 3s ease-in-out;
	}

	@keyframes fadeBackground {
		0% { opacity: 1; }
		50% { opacity: 0.5; }
		100% { opacity: 1; }
	}

	.ready-text {
		font-size: 2.5rem;
		color: white;
		text-align: center;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
		margin-bottom: 2rem;
	}

	.action-button {
		padding: 1rem 3rem;
		font-size: 1.3rem;
		font-weight: 600;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	}

	.action-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	}

	.skip-button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 0.8rem 2rem;
		font-size: 1.1rem;
		font-weight: 600;
		border-radius: 50px;
		border: 2px solid white;
		background: rgba(0, 0, 0, 0.3);
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.skip-button:hover {
		background: rgba(0, 0, 0, 0.5);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.ready-text {
			font-size: 2rem;
		}

		.skip-button {
			bottom: 1rem;
			right: 1rem;
			padding: 0.6rem 1.5rem;
			font-size: 1rem;
		}
	}
</style>
