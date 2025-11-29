import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { sceneStore } from '$lib/stores/sceneStore';

describe('sceneStore', () => {
	beforeEach(() => {
		sceneStore.set(null);
	});

	it('should initialize with null', () => {
		const value = get(sceneStore);
		expect(value).toBe(null);
	});

	it('should store beach scene', () => {
		sceneStore.set('beach');
		const value = get(sceneStore);
		expect(value).toBe('beach');
	});

	it('should store forest scene', () => {
		sceneStore.set('forest');
		const value = get(sceneStore);
		expect(value).toBe('forest');
	});

	it('should update from beach to forest', () => {
		sceneStore.set('beach');
		expect(get(sceneStore)).toBe('beach');
		
		sceneStore.set('forest');
		expect(get(sceneStore)).toBe('forest');
	});
});
