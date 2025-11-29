<script>
	// Props
	export let onSelect = (scene) => {}; // Callback when scene is selected
	export let scenes = [
		{ id: 'beach', name: 'Beach', image: null, description: 'Relaxing beach with sunset' },
		{ id: 'forest', name: 'Forest', image: null, description: 'Peaceful forest with nature sounds' }
	];
	export let columns = 2; // Grid columns
	export let showContinue = true; // Show continue button or auto-continue
	
	let selectedScene = null;

	function selectScene(sceneId) {
		selectedScene = sceneId;
		
		if (!showContinue) {
			// Auto-continue if button is hidden
			handleContinue();
		}
	}

	function handleContinue() {
		if (selectedScene && onSelect) {
			onSelect(selectedScene);
		}
	}
</script>

<div class="scene-selector">
	<div class="scene-options" style="grid-template-columns: repeat({columns}, 1fr);">
		{#each scenes as scene}
			<div class="scene-card">
				<div class="image-container">
					{#if scene.image}
						<img src={scene.image} alt={scene.description || scene.name} />
					{:else}
						<div class="placeholder-image" data-scene={scene.id}>
							<span>{scene.name}</span>
						</div>
					{/if}
				</div>
				<div class="checkbox-container">
					<button
						class="checkbox {selectedScene === scene.id ? 'checked' : ''}"
						on:click={() => selectScene(scene.id)}
						aria-label="Select {scene.name}"
					>
						{#if selectedScene === scene.id}
							<span class="checkmark">✓</span>
						{/if}
					</button>
					<span class="label">{scene.name}</span>
				</div>
			</div>
		{/each}
	</div>

	{#if showContinue}
		<div class="button-container">
			<button
				class="continue-button"
				on:click={handleContinue}
				disabled={!selectedScene}
			>
				Continue
			</button>
		</div>
	{/if}
</div>

<style>
	.scene-selector {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.scene-options {
		display: grid;
		gap: 3rem;
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
		transition: transform 0.3s ease;
	}

	.scene-card:hover .image-container {
		transform: scale(1.02);
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.placeholder-image {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		font-size: 2rem;
		font-weight: 600;
	}

	.placeholder-image[data-scene="beach"] {
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
	}

	.placeholder-image[data-scene="forest"] {
		background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
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
		font-size: 1.8rem;
		font-weight: 600;
		color: #2d3748;
	}

	.button-container {
		margin-top: 1rem;
	}

	.continue-button {
		padding: 1rem 3rem;
		border-radius: 50px;
		font-size: 1.3rem;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.continue-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.continue-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.scene-options {
			grid-template-columns: 1fr !important;
			gap: 2rem;
		}

		.image-container {
			width: 250px;
			height: 200px;
		}

		.label {
			font-size: 1.5rem;
		}
	}
</style>
