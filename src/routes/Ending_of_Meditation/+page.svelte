<script lang="ts">
	import { goto } from '$app/navigation';
	import { sceneStore } from '$lib/stores/sceneStore';
	import { onMount } from 'svelte';

	let selectedScene: 'beach' | 'forest' | null = null;
	let backgroundImage = '';

	onMount(() => {
		sceneStore.subscribe(value => {
			selectedScene = value;
			if (value === 'beach') {
				backgroundImage = '/ASSETS/Beach-Scence-Sun-Set.png';
			} else if (value === 'forest') {
				backgroundImage = '/ASSETS/Forest-Scence-Sun-Set.png';
			}
		});
	});

	function handleContinue() {
		goto('/');
	}

    function gotomeditation(){
        goto('/meditation')
    }

</script>

<div class="container" style="background-image: url('{backgroundImage}');">
	<div class="content">
		<h1 class="title">Meditation Complete</h1>
		<p class="message">Thank you for taking time to relax and breathe.</p>
		<p class="message">We hope you feel more centered and calm.</p>
		
		<button class="continue-button" on:click={handleContinue}>
			Return to Home
		</button>

        <button class="Redo-button" on:click={gotomeditation}>
			Do Another Exerice
		</button>
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
		align-items: center;
		justify-content: center;
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

	.content {
		text-align: center;
		padding: 3rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 24px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		max-width: 600px;
		animation: fadeIn 1s ease-in;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.title {
		font-size: 3rem;
		font-weight: 700;
		color: #2d3748;
		margin: 0 0 1.5rem 0;
	}

	.message {
		font-size: 1.5rem;
		color: #4a5568;
		margin: 0.75rem 0;
		line-height: 1.6;
	}

	.continue-button {
		margin-top: 2rem;
		padding: 1rem 3rem;
		background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 1.3rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
	}

    .Redo-button{
        margin-top: 2rem;
		padding: 1rem 3rem;
		background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 1.3rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }

	.continue-button:hover {
		background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
	}

        .Redo-button:hover{
        background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
    }


	@media (max-width: 768px) {
		.content {
			padding: 2rem;
			max-width: 90%;
		}

		.title {
			font-size: 2.5rem;
		}

		.message {
			font-size: 1.2rem;
		}

		.continue-button {
			font-size: 1.1rem;
			padding: 0.9rem 2.5rem;
		}
	}
</style>