import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { breathingMethodStore } from '$lib/stores/breathingMethodStore';

describe('breathingMethodStore', () => {
	beforeEach(() => {
		breathingMethodStore.set('box');
	});

	it('should initialize with box breathing', () => {
		const value = get(breathingMethodStore);
		expect(value).toBe('box');
	});

	it('should store 4-7-8 breathing method', () => {
		breathingMethodStore.set('4-7-8');
		const value = get(breathingMethodStore);
		expect(value).toBe('4-7-8');
	});

	it('should store diaphragmatic breathing method', () => {
		breathingMethodStore.set('diaphragmatic');
		const value = get(breathingMethodStore);
		expect(value).toBe('diaphragmatic');
	});

	it('should update breathing methods', () => {
		breathingMethodStore.set('box');
		expect(get(breathingMethodStore)).toBe('box');
		
		breathingMethodStore.set('4-7-8');
		expect(get(breathingMethodStore)).toBe('4-7-8');
		
		breathingMethodStore.set('diaphragmatic');
		expect(get(breathingMethodStore)).toBe('diaphragmatic');
	});
});
