import { writable } from 'svelte/store';

export const sceneStore = writable<'beach' | 'forest' | null>(null);
