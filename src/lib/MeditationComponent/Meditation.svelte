<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { breathingMethodStore, type BreathingMethod } from '$lib/stores/breathingMethodStore';
  const dispatch = createEventDispatcher();

  let phase = 'Breathe in';
  let timeLeft = 120; // seconds
  let totalElapsed = 0;
  let phaseIndex = 0;
  let interval;
  let breathingMethod: BreathingMethod = 'box';
  let circleScale = 1;

  // Different breathing patterns
  const breathingPatterns = {
    'box': {
      phases: ['Breathe in', 'Hold', 'Breathe out', 'Hold'],
      timings: [4, 4, 4, 4] // 4 seconds each
    },
    '4-7-8': {
      phases: ['Breathe in', 'Hold', 'Breathe out'],
      timings: [4, 7, 8] // 4-7-8 pattern
    },
    'diaphragmatic': {
      phases: ['Breathe in deeply', 'Breathe out slowly'],
      timings: [5, 5] // 5 seconds each
    }
  };

  let currentPattern = breathingPatterns['box'];
  let phaseTimer = 0;

  // Start timer
  onMount(() => {
    breathingMethodStore.subscribe(value => {
      breathingMethod = value;
      currentPattern = breathingPatterns[value];
      phase = currentPattern.phases[0];
    });

    const totalDuration = 120;

    interval = setInterval(() => {
      totalElapsed += 1;
      timeLeft = totalDuration - totalElapsed;
      phaseTimer += 1;

      // Trigger fade transition at 30 seconds remaining (90 seconds elapsed)
      if (totalElapsed === 90) {
        dispatch('fadeTransition');
      }

      // Animate circle based on phase
      const currentPhaseDuration = currentPattern.timings[phaseIndex];
      const progress = phaseTimer / currentPhaseDuration;
      
      if (phase.includes('in') || phase.includes('deeply')) {
        circleScale = 1 + (progress * 0.5); // Grow from 1 to 1.5
      } else if (phase.includes('out') || phase.includes('slowly')) {
        circleScale = 1.5 - (progress * 0.5); // Shrink from 1.5 to 1
      } else {
        // Hold phase
        circleScale = 1.5;
      }

      // Change phase when timer reaches phase duration
      if (phaseTimer >= currentPhaseDuration) {
        phaseTimer = 0;
        phaseIndex = (phaseIndex + 1) % currentPattern.phases.length;
        phase = currentPattern.phases[phaseIndex];
      }

      if (timeLeft <= 0) {
        clearInterval(interval);
        phase = 'Session complete';
        dispatch('complete'); // notify parent
      }
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="meditation">
  <div class="visual-haptic">
    <div class="breathing-circle" style="transform: scale({circleScale});">
      <div class="inner-circle"></div>
    </div>
  </div>
  
  <h2>{phase}</h2>

  {#if timeLeft > 0}
    <p>Time remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
  {/if}
</div>

<style>
  .meditation {
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 100%);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.8),
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
    background: radial-gradient(circle, rgba(255, 241, 161, 0.8) 0%, rgba(242, 255, 65, 0.5) 100%);
    box-shadow: inset 0 0 30px rgba(255, 217, 0, 0.6);
  }

  h2 {
    font-size: 3rem;
    margin: 0;
    color: white;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s ease;
    font-weight: 600;
  }

  p {
    font-size: 1.5rem;
    color: white;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    margin: 0;
  }
</style>
