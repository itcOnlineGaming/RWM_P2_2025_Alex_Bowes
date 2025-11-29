import { writable } from 'svelte/store';

// Selected breathing method ('box', '4-7-8', or 'diaphragmatic')
export const breathingMethod = writable('box');
