# Meditation Toolkit

Svelte components for building meditation and wellness apps. Supports Self-Regulated Learning (SRL) through stress tracking and breathing exercises.

## Installation

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Alex_Bowes.git#v0.1.0
```

## Components

### StressSlider
Visual stress assessment with color-coded slider (0-100).

```svelte
<script>
  import { StressSlider } from '@alexbowes/meditation-toolkit';
  let stress = 50;
</script>

<StressSlider bind:value={stress} />
```

### SceneSelector
Choose meditation scenes (Beach/Forest).

```svelte
<script>
  import { SceneSelector } from '@alexbowes/meditation-toolkit';
</script>

<SceneSelector onSelect={(scene) => console.log(scene)} />
```

### BreathingAnimation
Animated breathing guide (Box, 4-7-8, Diaphragmatic).

```svelte
<script>
  import { BreathingAnimation } from '@alexbowes/meditation-toolkit';
</script>

<BreathingAnimation method="box" duration={120} />
```

### MeditationTimer
Complete meditation session with countdown and breathing.

```svelte
<script>
  import { MeditationTimer } from '@alexbowes/meditation-toolkit';
</script>

<MeditationTimer duration={300} breathingMethod="4-7-8" scene="beach" />
```

## Stores

```javascript
import { stressLevel, selectedScene, breathingMethod } from '@alexbowes/meditation-toolkit';
```

## Example Flow

```svelte
<script>
  import { StressSlider, SceneSelector, MeditationTimer } from '@alexbowes/meditation-toolkit';
  let stress = 50;
  let step = 1;
</script>

{#if step === 1}
  <StressSlider bind:value={stress} />
  <button on:click={() => step++}>Next</button>
{:else if step === 2}
  <SceneSelector onSelect={() => step++} />
{:else}
  <MeditationTimer duration={120} onComplete={() => step = 1} />
{/if}
```

## License

MIT © Alex Bowes
