import { writable } from 'svelte/store';

// Current stress level (0-100)
export const stressLevel = writable(50);

// Initial stress level (before meditation)
export const initialStressLevel = writable(50);

// Final stress level (after meditation)
export const finalStressLevel = writable(50);
