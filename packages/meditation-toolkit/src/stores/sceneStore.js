import { writable } from 'svelte/store';

// Selected scene ('beach' or 'forest')
export const selectedScene = writable('beach');
