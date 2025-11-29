<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { initialStressLevel, finalStressLevel } from '$lib/stores/stressLevelStore';
	import { sceneStore } from '$lib/stores/sceneStore';
	import { breathingMethodStore } from '$lib/stores/breathingMethodStore';
	import { user } from '$lib/stores/authStore';
	import { meditationService } from '$lib/services/meditationService';
	import { onMount } from 'svelte';
	import HowYaNowSlider from '$lib/How_ya-Now/How_ya-Now.svelte';

	let previousStressLevel = 50;
	let previousLabel = '';
	let saving = false;
	let saved = false;

	onMount(() => {
		initialStressLevel.subscribe(value => {
			previousStressLevel = value;
			previousLabel = getStressLabel(value);
		});
	});

	function getStressLabel(level: number): string {
		if (level >= 90) return "I'm Fricked up";
		if (level >= 70) return "I'm Fed up";
		if (level >= 50) return "I'm getting there";
		if (level >= 30) return "Could be worse";
		if (level >= 15) return "Not too bad";
		return "I can't complain";
	}

	async function handleContinue() {
		// Save meditation session to Firestore if user is logged in
		if ($user && !saved) {
			saving = true;
			
			const initialLevel = $initialStressLevel;
			const finalLevel = $finalStressLevel;
			const improvement = initialLevel - finalLevel;

			await meditationService.saveMeditationSession({
				userId: $user.uid,
				scene: $sceneStore || 'beach',
				breathingMethod: $breathingMethodStore,
				initialStressLevel: initialLevel,
				finalStressLevel: finalLevel,
				stressImprovement: improvement,
				duration: 120 // 2 minutes meditation
			});

			saved = true;
			saving = false;
		}


		goto(base);
	}
</script>

<div class="page-container">
	<div class="header">
		<h1>How are ya now brown cow after the meditation?</h1>
		<p class="subtitle">You were feeling: <strong>{previousLabel}</strong></p>
	</div>

	<div class="content">
		<HowYaNowSlider />
	</div>

	<div class="footer">
		<a href="{base}/" class="continue-btn">Finish</a>
	</div>
</div>

<style>
	.page-container {
		width: 100vw;
		min-height: 100vh;
		background: linear-gradient(135deg, #ffd000ff 0%, #e5ff00ff 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		gap: 2rem;
	}

	.header {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24px;
		padding: 2rem 4rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		text-align: center;
	}

	.header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #2d3748;
		margin: 0 0 0.5rem 0;
	}

	.subtitle {
		font-size: 1.3rem;
		color: #4a5568;
		margin: 0;
	}

	.subtitle strong {
		color: #2d3748;
		font-weight: 700;
	}

	.content {
		background: rgba(255, 255, 255, 0.95);
		padding: 4rem;
		width: 90%;
		max-width: 1000px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 24px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}

	.slider-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		height: 500px;
		position: relative;
	}

	.silhouette-wrapper {
		position: relative;
		width: 220px;
		height: 500px;
		border: 3px solid #333;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.silhouette {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: relative;
		z-index: 2;
		mix-blend-mode: multiply;
	}

	.color-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		transition: height 0.2s ease, background 0.2s ease;
		z-index: 1;
	}

	.slider-track {
		position: relative;
		height: 500px;
		width: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.vertical-slider {
		writing-mode: bt-lr;
		-webkit-appearance: slider-vertical;
		height: 500px;
		width: 30px;
		background: transparent;
		outline: none;
		opacity: 0;
		cursor: pointer;
		z-index: 10;
	}

	.slider-thumb {
		position: absolute;
		width: 60px;
		height: 60px;
		background: white;
		border: 4px solid #333;
		border-radius: 50%;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		pointer-events: none;
		transform: translateY(50%);
		transition: bottom 0.1s ease;
		left: 50%;
		margin-left: -30px;
	}

	.labels {
		position: relative;
		height: 500px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 200px;
	}

	.label {
		font-size: 1.1rem;
		color: #4a5568;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.label.selected {
		position: absolute;
		background: #2d3748;
		color: white;
		font-weight: 700;
		font-size: 1.3rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: translateY(-50%);
		white-space: nowrap;
	}

	.footer {
		padding: 1rem;
		width: 90%;
		max-width: 1000px;
		display: flex;
		justify-content: flex-end;
	}

	.continue-btn {
		display: inline-block;
		background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
		color: white;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.2rem;
		font-weight: 600;
		border-radius: 50px;
		cursor: pointer;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
	}

	.continue-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
	}

	.continue-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		.header h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}
	}
</style>