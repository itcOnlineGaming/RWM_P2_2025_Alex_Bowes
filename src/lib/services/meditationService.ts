import { db, isConfigured } from '$lib/firebase';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

export interface MeditationSession {
	userId: string;
	scene: 'beach' | 'forest';
	breathingMethod: 'box' | '4-7-8' | 'diaphragmatic';
	initialStressLevel: number;
	finalStressLevel: number;
	stressImprovement: number;
	timestamp: Date;
	duration: number; // in seconds
}

export const meditationService = {
	async saveMeditationSession(session: Omit<MeditationSession, 'timestamp'>) {
		if (!db || !isConfigured) {
			console.warn('Firebase not configured - meditation session not saved');
			return { success: false, error: 'Firebase not configured' };
		}
		try {
			const docRef = await addDoc(collection(db, 'meditations'), {
				...session,
				timestamp: new Date()
			});
			return { success: true, id: docRef.id };
		} catch (error: any) {
			console.error('Error saving meditation session:', error);
			return { success: false, error: error.message };
		}
	},

	async getUserSessions(userId: string) {
		if (!db || !isConfigured) {
			console.warn('Firebase not configured - cannot fetch sessions');
			return { success: false, error: 'Firebase not configured', sessions: [] };
		}
		try {
			const q = query(
				collection(db, 'meditations'),
				where('userId', '==', userId),
				orderBy('timestamp', 'desc')
			);
			
			const querySnapshot = await getDocs(q);
			const sessions: MeditationSession[] = [];
			
			querySnapshot.forEach((doc) => {
				sessions.push({ ...doc.data(), id: doc.id } as any);
			});
			
			return { success: true, sessions };
		} catch (error: any) {
			console.error('Error fetching sessions:', error);
			return { success: false, error: error.message, sessions: [] };
		}
	},

	async getSessionStats(userId: string) {
		try {
			const result = await this.getUserSessions(userId);
			
			if (!result.success || result.sessions.length === 0) {
				return { 
					totalSessions: 0, 
					averageImprovement: 0, 
					favoriteScene: null,
					favoriteMethod: null 
				};
			}

			const sessions = result.sessions;
			const totalSessions = sessions.length;
			const averageImprovement = sessions.reduce((sum, s) => sum + s.stressImprovement, 0) / totalSessions;
			
			// Find favorite scene
			const sceneCount: Record<string, number> = {};
			sessions.forEach(s => {
				sceneCount[s.scene] = (sceneCount[s.scene] || 0) + 1;
			});
			const favoriteScene = Object.keys(sceneCount).reduce((a, b) => 
				sceneCount[a] > sceneCount[b] ? a : b
			);

			// Find favorite method
			const methodCount: Record<string, number> = {};
			sessions.forEach(s => {
				methodCount[s.breathingMethod] = (methodCount[s.breathingMethod] || 0) + 1;
			});
			const favoriteMethod = Object.keys(methodCount).reduce((a, b) => 
				methodCount[a] > methodCount[b] ? a : b
			);

			return {
				totalSessions,
				averageImprovement,
				favoriteScene,
				favoriteMethod
			};
		} catch (error) {
			console.error('Error calculating stats:', error);
			return { 
				totalSessions: 0, 
				averageImprovement: 0, 
				favoriteScene: null,
				favoriteMethod: null 
			};
		}
	}
};
