<script lang="ts">
	import { breathingMethodStore, type BreathingMethod } from '$lib/stores/breathingMethodStore';
	
	let isOpen = false;
	let selectedMethod: BreathingMethod = 'box';
	
	const methods = [
		{ value: 'box' as BreathingMethod, label: 'Box Breathing Method' },
		{ value: '4-7-8' as BreathingMethod, label: '4-7-8  Breathing Method' },
		{ value: 'diaphragmatic' as BreathingMethod, label: 'Diaphragmatic Breathing Method' }
	];
	
	function toggleDropdown() {
		isOpen = !isOpen;
	}
	
	function selectMethod(method: BreathingMethod) {
		selectedMethod = method;
		breathingMethodStore.set(method);
		isOpen = false;
	}
	
	function getLabel(value: BreathingMethod): string {
		return methods.find(m => m.value === value)?.label || '';
	}
</script>

<div class="dropdown-container">
	<button class="dropdown-button" on:click={toggleDropdown}>
		{getLabel(selectedMethod)}
		<span class="arrow" class:open={isOpen}>▼</span>
	</button>
	
	{#if isOpen}
		<div class="dropdown-menu">
			{#each methods as method}
				<button 
					class="dropdown-item"
					class:selected={selectedMethod === method.value}
					on:click={() => selectMethod(method.value)}
				>
					{method.label}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown-container {
		position: relative;
		width: 320px;
	}
	
	.dropdown-button {
		width: 100%;
		padding: 1rem 1.5rem;
		background: #d3d3d3;
		color: #333;
		border: 3px solid #333;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 0.3s ease;
	}
	
	.dropdown-button:hover {
		background: #c0c0c0;
	}
	
	.arrow {
		transition: transform 0.3s ease;
		font-size: 0.9rem;
	}
	
	.arrow.open {
		transform: rotate(180deg);
	}
	
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #e8e8e8;
		border: 3px solid #333;
		border-top: none;
		border-radius: 0 0 12px 12px;
		overflow: hidden;
		z-index: 10;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}
	
	.dropdown-item {
		width: 100%;
		padding: 1rem 1.5rem;
		background: #c0c0c0;
		color: #333;
		border: none;
		border-bottom: 2px solid #999;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		text-align: left;
		transition: background 0.2s ease;
	}
	
	.dropdown-item:last-child {
		border-bottom: none;
	}
	
	.dropdown-item:hover {
		background: #a8a8a8;
	}
	
	.dropdown-item.selected {
		background: #8b8b8b;
		font-weight: 600;
	}
</style>
