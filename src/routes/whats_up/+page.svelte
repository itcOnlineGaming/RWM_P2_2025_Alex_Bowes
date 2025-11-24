<script lang="ts">
	import WhatsUpSlider from '$lib/whats_up/whats_up.svelte';
</script>

<div class="page-container">
	<div class="header">
		<h1>How much have you had it up to here?</h1>
	</div>
	
	<div class="content">
		<WhatsUpSlider />
	</div>
	
	<div class="footer">
		<button class="continue-btn">Continue</button>
	</div>
</div>

<style>
	.page-container {
		width: 100vw;
		min-height: 100vh;
		background: linear-gradient(135deg, 
			#ffd000ff 0%,
			#e5ff00ff 100%);
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
	}
	
	.header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #2d3748;
		margin: 0;
		text-align: center;
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
	
	.footer {
		padding: 1rem;
		width: 90%;
		max-width: 1000px;
		display: flex;
		justify-content: flex-end;
	}
	
	.continue-btn {
		background: linear-gradient(135deg, #b68500ff 0%, #ffd900ff 100%);
		color: white;
		border: none;
		padding: 1rem 3rem;
		font-size: 1.2rem;
		font-weight: 600;
		border-radius: 50px;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 15px rgba(156, 107, 0, 0.4);
	}
	
	.continue-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0,0,0,0.3);
	}
	
	.continue-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
	}
</style>