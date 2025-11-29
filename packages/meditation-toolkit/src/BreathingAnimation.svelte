<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Props
	export let method = 'box'; // 'box', '4-7-8', 'diaphragmatic'
	export let duration = 120; // Duration in seconds
	export let showTimer = true; // Show countdown timer
	export let onComplete = null; // Callback when complete
	export let autoStart = false; // Auto-start animation
	
	let phase = 'Breathe in';
	let timeLeft = duration;
	let totalElapsed = 0;
	let phaseIndex = 0;
	let interval = null;
	let circleScale = 1;
	let isRunning = false;

	// Different breathing patterns
	const breathingPatterns = {
		'box': {
			phases: ['Breathe in', 'Hold', 'Breathe out', 'Hold'],
			timings: [4, 4, 4, 4]
		},
		'4-7-8': {
			phases: ['Breathe in', 'Hold', 'Breathe out'],
			timings: [4, 7, 8]
		},
		'diaphragmatic': {
			phases: ['Breathe in deeply', 'Breathe out slowly'],
			timings: [5, 5]
		}
	};

	let currentPattern = breathingPatterns[method] || breathingPatterns['box'];
	let phaseTimer = 0;

	onMount(() => {
		if (autoStart) {
			start();
		}
	});

	onDestroy(() => {
		stop();
	});

	export function start() {
		if (isRunning) return;
		
		isRunning = true;
		phase = currentPattern.phases[0];
		
		interval = setInterval(() => {
			totalElapsed += 1;
			timeLeft = duration - totalElapsed;
			phaseTimer += 1;

			// Animate circle based on phase
			const currentPhaseDuration = currentPattern.timings[phaseIndex];
			const progress = phaseTimer / currentPhaseDuration;
			
			if (phase.includes('in') || phase.includes('deeply')) {
				circleScale = 1 + (progress * 0.5); // Grow
			} else if (phase.includes('out') || phase.includes('slowly')) {
				circleScale = 1.5 - (progress * 0.5); // Shrink
			} else {
				circleScale = 1.5; // Hold
			}

			// Change phase
			if (phaseTimer >= currentPhaseDuration) {
				phaseTimer = 0;
				phaseIndex = (phaseIndex + 1) % currentPattern.phases.length;
				phase = currentPattern.phases[phaseIndex];
			}

			if (timeLeft <= 0) {
				stop();
				phase = 'Complete';
				dispatch('complete');
				if (onComplete) onComplete();
			}
		}, 1000);
	}

	export function stop() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
		isRunning = false;
	}

	export function reset() {
		stop();
		totalElapsed = 0;
		timeLeft = duration;
		phaseIndex = 0;
		phaseTimer = 0;
		circleScale = 1;
		phase = currentPattern.phases[0];
	}
</script>

<div class="breathing-animation">
	<div class="visual-haptic">
		<div class="breathing-circle" style="transform: scale({circleScale});">
			<div class="inner-circle"></div>
		</div>
	</div>
	
	<h2 class="phase-text">{phase}</h2>

	{#if showTimer && timeLeft > 0}
		<p class="timer-text">
			{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
		</p>
	{/if}
</div>

<style>
	.breathing-animation {
		text-align: center;
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
	}

	.visual-haptic {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 300px;
	}

	.breathing-circle {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: radial-gradient(circle, 
			rgba(255, 255, 255, 0.9) 0%, 
			rgba(255, 255, 255, 0.6) 50%, 
			rgba(255, 255, 255, 0.3) 100%);
		box-shadow: 
			0 0 40px rgba(255, 255, 255, 0.8),
			0 0 80px rgba(255, 255, 255, 0.5),
			inset 0 0 40px rgba(255, 255, 255, 0.4);
		transition: transform 1s ease-in-out;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inner-circle {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		background: radial-gradient(circle, 
			rgba(255, 241, 161, 0.8) 0%, 
			rgba(242, 255, 65, 0.5) 100%);
		box-shadow: inset 0 0 30px rgba(255, 217, 0, 0.6);
	}

	.phase-text {
		font-size: 3rem;
		margin: 0;
		color: white;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
		transition: opacity 0.5s ease;
		font-weight: 600;
	}

	.timer-text {
		font-size: 1.5rem;
		color: white;
		text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
		margin: 0;
	}

	@media (max-width: 768px) {
		.breathing-circle {
			width: 150px;
			height: 150px;
		}

		.inner-circle {
			width: 100px;
			height: 100px;
		}

		.phase-text {
			font-size: 2rem;
		}

		.timer-text {
			font-size: 1.2rem;
		}
	}
</style>
