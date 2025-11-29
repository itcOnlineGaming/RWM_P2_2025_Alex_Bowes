<script>
	import { StressSlider, SceneSelector, BreathingAnimation, MeditationTimer } from '@alexbowes/meditation-toolkit';
	import { initialStressLevel, finalStressLevel, selectedScene, breathingMethod } from '@alexbowes/meditation-toolkit';
	import { onMount } from 'svelte';
	import { initializeApp } from 'firebase/app';
	import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
	import { getFirestore, collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

	// Firebase config - replace with your own
	const firebaseConfig = {
		apiKey: "YOUR_API_KEY",
		authDomain: "YOUR_AUTH_DOMAIN",
		projectId: "YOUR_PROJECT_ID",
		storageBucket: "YOUR_STORAGE_BUCKET",
		messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
		appId: "YOUR_APP_ID"
	};

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const db = getFirestore(app);

	let step = 'welcome'; // welcome, login, stress1, scene, breathing, meditation, stress2, complete
	let user = null;
	let email = '';
	let password = '';
	let authError = '';
	let meditationHistory = [];
	let breathingComponent;

	onMount(() => {
		onAuthStateChanged(auth, (firebaseUser) => {
			user = firebaseUser;
			if (user) {
				loadMeditationHistory();
			}
		});
	});

	async function handleLogin() {
		try {
			authError = '';
			await signInWithEmailAndPassword(auth, email, password);
			step = 'stress1';
		} catch (error) {
			authError = error.message;
		}
	}

	async function handleSignup() {
		try {
			authError = '';
			await createUserWithEmailAndPassword(auth, email, password);
			step = 'stress1';
		} catch (error) {
			authError = error.message;
		}
	}

	async function handleLogout() {
		await signOut(auth);
		step = 'welcome';
	}

	async function loadMeditationHistory() {
		if (!user) return;
		
		const q = query(
			collection(db, 'meditationSessions'),
			where('userId', '==', user.uid),
			orderBy('timestamp', 'desc'),
			limit(5)
		);
		
		const querySnapshot = await getDocs(q);
		meditationHistory = querySnapshot.docs.map(doc => doc.data());
	}

	async function saveMeditationSession() {
		if (!user) return;

		const improvement = $initialStressLevel - $finalStressLevel;
		
		await addDoc(collection(db, 'meditationSessions'), {
			userId: user.uid,
			scene: $selectedScene,
			breathingMethod: $breathingMethod,
			initialStressLevel: $initialStressLevel,
			finalStressLevel: $finalStressLevel,
			stressImprovement: improvement,
			duration: 120,
			timestamp: new Date()
		});

		await loadMeditationHistory();
	}

	function handleSceneSelect(scene) {
		$selectedScene = scene;
		step = 'breathing';
	}

	function handleMeditationComplete() {
		step = 'stress2';
	}

	async function handleFinish() {
		await saveMeditationSession();
		step = 'complete';
	}

	function startBreathing() {
		if (breathingComponent) {
			breathingComponent.start();
		}
		setTimeout(() => {
			step = 'meditation';
		}, 30000); // 30 seconds of breathing
	}
</script>

<div class="demo-container">
	<header>
		<h1>🧘 Meditation Toolkit Demo</h1>
		{#if user}
			<div class="user-info">
				<span>{user.email}</span>
				<button on:click={handleLogout}>Logout</button>
			</div>
		{/if}
	</header>

	<main>
		{#if step === 'welcome'}
			<div class="welcome">
				<h2>Welcome to Meditation Toolkit</h2>
				<p>This demo shows all components from the @alexbowes/meditation-toolkit package</p>
				<button class="primary-btn" on:click={() => step = 'login'}>Get Started</button>
			</div>
		{:else if step === 'login'}
			<div class="auth-form">
				<h2>Login or Sign Up</h2>
				<input type="email" bind:value={email} placeholder="Email" />
				<input type="password" bind:value={password} placeholder="Password" />
				{#if authError}
					<p class="error">{authError}</p>
				{/if}
				<div class="button-group">
					<button on:click={handleLogin}>Login</button>
					<button on:click={handleSignup}>Sign Up</button>
				</div>
			</div>
		{:else if step === 'stress1'}
			<div class="step">
				<h2>How stressed are you?</h2>
				<StressSlider bind:value={$initialStressLevel} />
				<button class="primary-btn" on:click={() => step = 'scene'}>Continue</button>
			</div>
		{:else if step === 'scene'}
			<div class="step">
				<h2>Choose your scene</h2>
				<SceneSelector onSelect={handleSceneSelect} />
			</div>
		{:else if step === 'breathing'}
			<div class="step">
				<h2>Choose breathing method</h2>
				<div class="breathing-options">
					<button on:click={() => { $breathingMethod = 'box'; startBreathing(); }}>
						Box Breathing (4-4-4-4)
					</button>
					<button on:click={() => { $breathingMethod = '4-7-8'; startBreathing(); }}>
						4-7-8 Breathing
					</button>
					<button on:click={() => { $breathingMethod = 'diaphragmatic'; startBreathing(); }}>
						Diaphragmatic
					</button>
				</div>
				<BreathingAnimation 
					bind:this={breathingComponent}
					method={$breathingMethod}
					duration={30}
					showTimer={true}
				/>
			</div>
		{:else if step === 'meditation'}
			<div class="step full-screen">
				<MeditationTimer
					duration={120}
					breathingMethod={$breathingMethod}
					scene={$selectedScene}
					onComplete={handleMeditationComplete}
					autoStart={true}
				/>
			</div>
		{:else if step === 'stress2'}
			<div class="step">
				<h2>How do you feel now?</h2>
				<p>You were at: {$initialStressLevel}%</p>
				<StressSlider bind:value={$finalStressLevel} />
				<button class="primary-btn" on:click={handleFinish}>Finish</button>
			</div>
		{:else if step === 'complete'}
			<div class="complete">
				<h2>Session Complete! 🎉</h2>
				<div class="results">
					<p>Initial Stress: <strong>{$initialStressLevel}%</strong></p>
					<p>Final Stress: <strong>{$finalStressLevel}%</strong></p>
					<p>Improvement: <strong>{$initialStressLevel - $finalStressLevel}%</strong></p>
				</div>
				
				<h3>Your History</h3>
				{#if meditationHistory.length > 0}
					<ul class="history">
						{#each meditationHistory as session}
							<li>
								{new Date(session.timestamp.seconds * 1000).toLocaleDateString()} - 
								{session.scene} - 
								Improvement: {session.stressImprovement}%
							</li>
						{/each}
					</ul>
				{:else}
					<p>No previous sessions</p>
				{/if}
				
				<button class="primary-btn" on:click={() => step = 'stress1'}>Start Again</button>
			</div>
		{/if}
	</main>
</div>

<style>
	.demo-container {
		min-height: 100vh;
		padding: 2rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 15px;
		margin-bottom: 2rem;
	}

	header h1 {
		margin: 0;
		color: #2d3748;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 150px);
	}

	.welcome, .auth-form, .step, .complete {
		background: rgba(255, 255, 255, 0.95);
		padding: 3rem;
		border-radius: 20px;
		text-align: center;
		max-width: 800px;
		width: 100%;
	}

	.step.full-screen {
		max-width: 100%;
		background: transparent;
		padding: 0;
	}

	h2 {
		margin-bottom: 2rem;
		color: #2d3748;
	}

	.auth-form input {
		display: block;
		width: 100%;
		padding: 1rem;
		margin-bottom: 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 10px;
		font-size: 1rem;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.breathing-options {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.breathing-options button {
		padding: 1rem 2rem;
		border-radius: 10px;
		border: none;
		background: #667eea;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.breathing-options button:hover {
		transform: translateY(-2px);
		background: #5a67d8;
	}

	.primary-btn {
		padding: 1rem 3rem;
		border-radius: 50px;
		border: none;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		font-size: 1.2rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 2rem;
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
	}

	button {
		padding: 0.8rem 2rem;
		border-radius: 10px;
		border: none;
		background: #667eea;
		color: white;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	button:hover {
		background: #5a67d8;
	}

	.error {
		color: #e53e3e;
		margin: 1rem 0;
	}

	.results {
		background: #f7fafc;
		padding: 2rem;
		border-radius: 15px;
		margin: 2rem 0;
	}

	.results p {
		font-size: 1.2rem;
		margin: 0.5rem 0;
	}

	.history {
		list-style: none;
		text-align: left;
		background: #f7fafc;
		padding: 1.5rem;
		border-radius: 10px;
		margin: 1rem 0;
	}

	.history li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #e2e8f0;
	}

	.history li:last-child {
		border-bottom: none;
	}

	@media (max-width: 768px) {
		.demo-container {
			padding: 1rem;
		}

		header {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
