<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import Meditation from '$lib/MeditationComponent/Meditation.svelte';
  import { sceneStore } from '$lib/stores/sceneStore';
  import { onMount, onDestroy } from 'svelte';

  let started = false;
  let completed = false;
  let selectedScene: 'beach' | 'forest' | null = null;
  let backgroundImage = '';
  let fadeTransition = false;
  let audioElement: HTMLAudioElement | null = null;
  let audioSource = '';;

  onMount(() => {
    sceneStore.subscribe(value => {
      selectedScene = value;
      if (value === 'beach') {
        backgroundImage = `${base}/ASSETS/Beach-Scence (1).png`;
        audioSource = `${base}/ASSETS/ocean-waves-250310.mp3`;
      } else if (value === 'forest') {
        backgroundImage = `${base}/ASSETS/Forest-Scence (1).png`;
        audioSource = `${base}/ASSETS/wind-in-the-trees-24035.mp3`;
      }
    });
  });

  onDestroy(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  });

  function startMeditation() {
    started = true;
    // Start playing audio
    if (audioElement) {
      audioElement.play();
    }
  }

  function handleComplete() {
    completed = true;
    // Stop audio when meditation completes
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    // Navigate to ending page
    goto(`${base}/Ending_of_Meditation`);
  }

  function skipMeditation() {
    completed = true;
    // Stop audio when skipping
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    // Navigate to ending page
    goto(`${base}/Ending_of_Meditation`);
  }

  function handleFadeTransition() {
    fadeTransition = true;
    // Change to version without sun
    if (selectedScene === 'beach') {
      backgroundImage = `${base}/ASSETS/Beach-Scence-Sun-Set.png`;
    } else if (selectedScene === 'forest') {
      backgroundImage = `${base}/ASSETS/Forest-Scence-Sun-Set.png`;
    }
  }
</script>

<audio bind:this={audioElement} src={audioSource} loop preload="auto"></audio>

<div class="container" style="background-image: url('{backgroundImage}');" class:fade={fadeTransition}>
  {#if !started}
    <h1>Ready to Begin Meditation</h1>
  {/if}

  {#if started}
    <Meditation on:complete={handleComplete} on:fadeTransition={handleFadeTransition} />
  {/if}

  <div class="button-container">
    {#if !started}
      <button class="action-button" on:click={startMeditation}>Start</button>
    {/if}

    {#if started && !completed}
      <button class="action-button skip-button" on:click={skipMeditation}>Skip</button>
    {/if}

    {#if completed}
      <a href= " " class="action-button continue">Continue</a>
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 3s ease-in-out;
  }

  .container.fade {
    animation: fadeBackground 3s ease-in-out;
  }

  @keyframes fadeBackground {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
    text-align: center;
  }

  .button-container {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
    display: flex;
    justify-content: space-between;
    max-width: 100%;
  }

  .action-button {
    padding: 1rem 2rem;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .action-button:hover {
    background-color: #45a049;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  .skip-button {
    background-color: #ff9800 !important;
    position: fixed;
    bottom: 2rem;
    left: 2rem;
  }

  .skip-button:hover {
    background-color: #f57c00 !important;
  }

  /* Continue button on bottom-right */
  .continue {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
  }
</style>
