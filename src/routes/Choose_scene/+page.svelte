<script lang="ts">
	import { goto } from '$app/navigation';
	import { sceneStore } from '$lib/stores/sceneStore';

	let selectedScene: 'beach' | 'forest' | null = null;

	function selectScene(scene: 'beach' | 'forest') {
		selectedScene = scene;
	}

	function goBack() {
		goto('/whats_up');
	}

	function handleContinue() {
		if (selectedScene) {
			sceneStore.set(selectedScene);
			goto('/Breathing_Methods_Selection');
		}
	}
</script>

<div class="container">
	<div class="header">
		<h1>Where do you see yourself relaxing ?</h1>
	</div>

	<div class="scene-options">
		<div class="scene-card">
			<div class="image-container">
				<img src="/ASSETS/Beach-Scence-with-sun.png" alt="Beach scene with sunset" />
			</div>
			<div class="checkbox-container">
				<button
					class="checkbox {selectedScene === 'beach' ? 'checked' : ''}"
					on:click={() => selectScene('beach')}
					aria-label="Select beach"
				>
					{#if selectedScene === 'beach'}
						<span class="checkmark"></span>
					{/if}
				</button>
				<span class="label">Beach</span>
			</div>
		</div>

		<div class="scene-card">
			<div class="image-container">
				<img src="/ASSETS/Forest-Scence-with-sun.png" alt="Forest scene with moon" />
			</div>
			<div class="checkbox-container">
				<button
					class="checkbox {selectedScene === 'forest' ? 'checked' : ''}"
					on:click={() => selectScene('forest')}
					aria-label="Select forest"
				>
					{#if selectedScene === 'forest'}
						<span class="checkmark"></span>
					{/if}
				</button>
				<span class="label">Forest</span>
			</div>
		</div>
	</div>

	<div class="button-container">
		<button class="nav-button back-button" on:click={goBack}>Back</button>
		<button
			class="nav-button continue-button"
			on:click={handleContinue}
			disabled={!selectedScene}
		>
			Continue
		</button>
	</div>
</div>

<style>
	.container {
		width: 100vw;
		min-height: 100vh;
		background: linear-gradient(180deg, 
			#ffa500 0%,
			#ffd000 50%,
			#ffff00 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		box-sizing: border-box;
	}

	.header {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 30px;
		padding: 2rem 3rem;
		margin-bottom: 3rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}

	.header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #2d3748;
		margin: 0;
		text-align: center;
	}

	.scene-options {
		display: flex;
		gap: 4rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.scene-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.image-container {
		width: 300px;
		height: 250px;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		background: white;
		border: 4px solid rgba(139, 69, 19, 0.6);
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.checkbox-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.checkbox {
		width: 50px;
		height: 50px;
		border: 3px solid #333;
		border-radius: 8px;
		background: white;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		padding: 0;
	}

	.checkbox:hover {
		transform: scale(1.05);
		border-color: #555;
	}

	.checkbox.checked {
		background: #4a5568;
		border-color: #2d3748;
	}

	.checkmark {
		color: white;
		font-size: 2rem;
		font-weight: bold;
	}

	.label {
		font-size: 2rem;
		font-weight: 600;
		color: #2d3748;
	}

	.button-container {
		display: flex;
		gap: 2rem;
		margin-top: 2rem;
	}

	.nav-button {
		padding: 1rem 3rem;
		border-radius: 50px;
		font-size: 1.5rem;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.back-button {
		background: rgba(255, 140, 100, 0.9);
		color: white;
	}

	.back-button:hover {
		background: rgba(255, 120, 80, 1);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.continue-button {
		background: rgba(255, 140, 100, 0.9);
		color: white;
	}

	.continue-button:hover:not(:disabled) {
		background: rgba(255, 120, 80, 1);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.continue-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.scene-options {
			gap: 2rem;
		}

		.image-container {
			width: 250px;
			height: 200px;
		}

		.header h1 {
			font-size: 2rem;
		}

		.label {
			font-size: 1.5rem;
		}
	}
</style>
