# Meditation Toolkit - Demo App

This demo app shows how to use the `@alexbowes/meditation-toolkit` package in a real SvelteKit application with Firebase authentication.

## Features Demonstrated

- **StressSlider**: Visual stress assessment before and after meditation
- **SceneSelector**: Choose between beach/forest meditation scenes
- **BreathingAnimation**: Guided breathing exercises (Box, 4-7-8, Diaphragmatic)
- **MeditationTimer**: Complete meditation session with countdown
- **Firebase Auth**: Login/signup functionality
- **Firestore**: Save meditation history (requires authentication)

## Setup

1. Install dependencies:
```bash
cd demo
npm install
```

2. Configure Firebase:
   - Edit `src/routes/+page.svelte`
   - Replace `YOUR_API_KEY`, etc. with your Firebase credentials

3. Run the demo:
```bash
npm run dev
```

4. Open http://localhost:5173

## Using the Package

The demo imports components like this:

```javascript
import { 
  StressSlider, 
  SceneSelector, 
  BreathingAnimation, 
  MeditationTimer 
} from '@alexbowes/meditation-toolkit';
```

The Vite config aliases the package to the local source:

```javascript
resolve: {
  alias: {
    '@alexbowes/meditation-toolkit': '../packages/meditation-toolkit/src'
  }
}
```

## Authenticated Feature

The demo saves meditation sessions to Firestore when a user is logged in:

- Initial stress level
- Final stress level
- Stress improvement percentage
- Scene chosen
- Breathing method used
- Timestamp

Users can view their meditation history after completing a session.
