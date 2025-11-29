import { writable } from 'svelte/store';
import { auth, isConfigured } from '$lib/firebase';
import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	type User
} from 'firebase/auth';

export const user = writable<User | null>(null);
export const loading = writable(true);

// Listen for auth state changes with error handling
if (auth && isConfigured) {
	try {
		onAuthStateChanged(auth, (firebaseUser) => {
			user.set(firebaseUser);
			loading.set(false);
		}, (error) => {
			console.warn('Firebase auth error:', error);
			loading.set(false);
		});
	} catch (error) {
		console.warn('Firebase initialization error:', error);
		loading.set(false);
	}
} else {
	// Firebase not configured, set loading to false immediately
	loading.set(false);
}

export const authHandlers = {
	signup: async (email: string, password: string) => {
		if (!auth || !isConfigured) {
			return { success: false, error: 'Firebase authentication not configured. See FIREBASE_SETUP.md' };
		}
		try {
			const result = await createUserWithEmailAndPassword(auth, email, password);
			return { success: true, user: result.user };
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	},
	
	login: async (email: string, password: string) => {
		if (!auth || !isConfigured) {
			return { success: false, error: 'Firebase authentication not configured. See FIREBASE_SETUP.md' };
		}
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			return { success: true, user: result.user };
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	},
	
	logout: async () => {
		if (!auth || !isConfigured) {
			return { success: false, error: 'Firebase authentication not configured' };
		}
		try {
			await signOut(auth);
			return { success: true };
		} catch (error: any) {
			return { success: false, error: error.message };
		}
	}
};
