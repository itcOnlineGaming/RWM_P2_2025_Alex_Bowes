import { writable } from 'svelte/store';

export type BreathingMethod = 'box' | '4-7-8' | 'diaphragmatic';

export const breathingMethodStore = writable<BreathingMethod>('box');
