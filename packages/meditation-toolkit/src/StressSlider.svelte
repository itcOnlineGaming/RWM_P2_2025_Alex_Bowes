<script>
	// Props with defaults
	export let value = 50; // 0-100 stress level
	export let labels = [
		"I can't complain",
		"Not too bad",
		"Could be worse",
		"I'm getting there",
		"I'm Fed up",
		"I'm Fricked up"
	];
	export let colors = {
		low: '#00ff00',    // Green
		medium: '#ffff00', // Yellow
		high: '#ff0000'    // Red
	};
	export let silhouetteUrl = null; // Optional custom silhouette image
	
	// Calculate color based on stress level
	$: sliderColor = getColorForLevel(value);
	
	function getColorForLevel(level) {
		if (level > 50) {
			// Interpolate between yellow and red
			const ratio = (level - 50) / 50;
			return `rgb(${255}, ${Math.round(255 - 128 * ratio)}, 0)`;
		} else {
			// Interpolate between green and yellow
			const ratio = level / 50;
			return `rgb(${Math.round(255 * ratio)}, 255, 0)`;
		}
	}
	
	function getStressLabel(level) {
		if (level >= 90) return labels[5] || "Very High";
		if (level >= 70) return labels[4] || "High";
		if (level >= 50) return labels[3] || "Medium-High";
		if (level >= 30) return labels[2] || "Medium";
		if (level >= 15) return labels[1] || "Low";
		return labels[0] || "Very Low";
	}
</script>

<div class="slider-container">
	<div class="silhouette-wrapper">
		{#if silhouetteUrl}
			<img src={silhouetteUrl} alt="Stress indicator" class="silhouette" />
		{:else}
			<div class="default-silhouette"></div>
		{/if}
		<div class="color-overlay" style="height: {value}%; background: {sliderColor};"></div>
	</div>
	
	<div class="slider-track">
		<input
			type="range"
			min="0"
			max="100"
			bind:value
			orient="vertical"
			class="vertical-slider"
		/>
		<div class="slider-thumb" style="bottom: {value}%;"></div>
	</div>
	
	<div class="labels">
		<div class="label">{labels[5] || "Very High"}</div>
		<div class="label">{labels[4] || "High"}</div>
		<div class="label selected" style="top: {100 - value}%;">
			{getStressLabel(value)}
		</div>
		<div class="label">{labels[3] || "Medium-High"}</div>
		<div class="label">{labels[2] || "Medium"}</div>
		<div class="label">{labels[1] || "Low"}</div>
		<div class="label">{labels[0] || "Very Low"}</div>
	</div>
</div>

<style>
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
		background: white;
	}
	
	.silhouette {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: relative;
		z-index: 2;
		mix-blend-mode: multiply;
	}
	
	.default-silhouette {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 2;
		background: linear-gradient(180deg, 
			rgba(0,0,0,0.1) 0%,
			rgba(0,0,0,0.3) 30%,
			rgba(0,0,0,0.3) 70%,
			rgba(0,0,0,0.1) 100%
		);
		clip-path: ellipse(40% 50% at 50% 50%);
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
	
	.vertical-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 30px;
		height: 30px;
		background: transparent;
		cursor: pointer;
	}
	
	.vertical-slider::-moz-range-thumb {
		width: 30px;
		height: 30px;
		background: transparent;
		cursor: pointer;
		border: none;
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
	
	input[type="range"][orient="vertical"] {
		writing-mode: bt-lr;
		-webkit-appearance: slider-vertical;
		width: 30px;
	}
</style>
