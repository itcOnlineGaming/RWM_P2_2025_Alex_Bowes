<script lang="ts">
	let stressLevel = 50; // 0-100, where 0 is "I can't complain" and 100 is "I'm Fricked up"
	
	// Calculate the color based on stress level
	$: sliderColor = getColorForLevel(stressLevel);
	
	function getColorForLevel(level: number): string {
		// Red at top (100), yellow in middle (50), green at bottom (0)
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
	
	function getStressLabel(level: number): string {
		if (level >= 90) return "I'm Fricked up";
		if (level >= 70) return "I'm Fed up";
		if (level >= 50) return "I'm getting there";
		if (level >= 30) return "Could be worse";
		if (level >= 15) return "Not too bad";
		return "I can't complain";
	}
</script>

<div class="slider-container">
	<div class="silhouette-wrapper">
		<img src="/ASSETS/Siloet_of_Person.png" alt="Person silhouette" class="silhouette" />
		<div class="color-overlay" style="height: {stressLevel}%; background: {sliderColor};"></div>
	</div>
	
	<div class="slider-track">
		<input
			type="range"
			min="0"
			max="100"
			bind:value={stressLevel}
			orient="vertical"
			class="vertical-slider"
		/>
		<div class="slider-thumb" style="bottom: {stressLevel}%;"></div>
	</div>
	
	<div class="labels">
		<div class="label">I'm Fricked up</div>
		<div class="label">I'm Fed up</div>
		<div class="label selected" style="top: {100 - stressLevel}%;">
			{getStressLabel(stressLevel)}
		</div>
		<div class="label">I'm getting there</div>
		<div class="label">Could be worse</div>
		<div class="label">Not too bad</div>
		<div class="label">I can't complain</div>
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
		width: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.vertical-slider {
		-webkit-appearance: slider-vertical;
		appearance: slider-vertical;
		width: 8px;
		height: 100%;
		writing-mode: bt-lr;
		cursor: pointer;
		background: linear-gradient(to top, 
			rgb(0, 255, 0) 0%,
			rgb(255, 255, 0) 50%,
			rgb(255, 0, 0) 100%);
		border-radius: 10px;
		outline: none;
	}
	
	.vertical-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 30px;
		height: 30px;
		background: black;
		cursor: pointer;
		border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 2px 4px rgba(0,0,0,0.3);
	}
	
	.vertical-slider::-moz-range-thumb {
		width: 30px;
		height: 30px;
		background: black;
		cursor: pointer;
		border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 2px 4px rgba(0,0,0,0.3);
	}
	
	.labels {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 500px;
		position: relative;
		min-width: 200px;
	}
	
	.label {
		font-size: 1.2rem;
		font-weight: 500;
		color: #333;
		padding: 0.5rem;
	}
	
	.label.selected {
		position: absolute;
		right: 0;
		font-weight: bold;
		color: black;
		background: rgba(255, 255, 255, 0.9);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: 2px solid black;
		transform: translateY(-50%);
		white-space: nowrap;
	}
</style>