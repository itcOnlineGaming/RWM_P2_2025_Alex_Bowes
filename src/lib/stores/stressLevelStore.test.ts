import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { initialStressLevel, finalStressLevel } from '$lib/stores/stressLevelStore';

describe('stressLevelStore', () => {
	beforeEach(() => {
		initialStressLevel.set(0);
		finalStressLevel.set(0);
	});

	it('should initialize stress levels at 0', () => {
		expect(get(initialStressLevel)).toBe(0);
		expect(get(finalStressLevel)).toBe(0);
	});

	it('should store initial stress level', () => {
		initialStressLevel.set(75);
		expect(get(initialStressLevel)).toBe(75);
	});

	it('should store final stress level', () => {
		finalStressLevel.set(30);
		expect(get(finalStressLevel)).toBe(30);
	});

	it('should track stress improvement', () => {
		initialStressLevel.set(85);
		finalStressLevel.set(40);
		
		const improvement = get(initialStressLevel) - get(finalStressLevel);
		expect(improvement).toBe(45);
		expect(improvement).toBeGreaterThan(0);
	});

	it('should handle maximum stress levels', () => {
		initialStressLevel.set(100);
		expect(get(initialStressLevel)).toBe(100);
	});

	it('should handle minimum stress levels', () => {
		finalStressLevel.set(0);
		expect(get(finalStressLevel)).toBe(0);
	});
});
