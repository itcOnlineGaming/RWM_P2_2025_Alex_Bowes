import { writable } from 'svelte/store';

export const initialStressLevel = writable<number>(50);
export const finalStressLevel = writable<number>(50);
