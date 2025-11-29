<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { user, loading } from '$lib/stores/authStore';
	import { meditationService } from '$lib/services/meditationService';
	import { onMount } from 'svelte';

	let sessions: any[] = [];
	let stats = {
		totalSessions: 0,
		averageImprovement: 0,
		favoriteScene: null as string | null,
		favoriteMethod: null as string | null
	};
	let loadingData = true;

	onMount(async () => {
		if (!$user) {
			goto(`${base}/login`);
			return;
		}

		// Fetch user's meditation sessions
		const result = await meditationService.getUserSessions($user.uid);
		if (result.success) {
			sessions = result.sessions;
		}

		// Get stats
		stats = await meditationService.getSessionStats($user.uid);
		loadingData = false;
	});

	function formatDate(timestamp: any) {
		if (!timestamp) return 'Unknown';
		const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	}
</script>

{#if $loading || loadingData}
	<div class="loading">Loading your meditation history...</div>
{:else if $user}
<div class="dashboard-container">
	<div class="header">
		<h1>Your Meditation Journey</h1>
		<a href="{base}/" class="btn-back">← Home</a>
	</div>

	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-value">{stats.totalSessions}</div>
			<div class="stat-label">Total Sessions</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats.averageImprovement.toFixed(0)}%</div>
			<div class="stat-label">Avg Stress Reduction</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats.favoriteScene || 'N/A'}</div>
			<div class="stat-label">Favorite Scene</div>
		</div>
		<div class="stat-card">
			<div class="stat-value">{stats.favoriteMethod || 'N/A'}</div>
			<div class="stat-label">Favorite Method</div>
		</div>
	</div>

	<div class="sessions-section">
		<h2>Recent Sessions</h2>
		
		{#if sessions.length === 0}
			<p class="empty-state">No meditation sessions yet. Start your first session!</p>
		{:else}
			<div class="sessions-list">
				{#each sessions as session}
					<div class="session-card">
						<div class="session-header">
							<span class="scene-badge">{session.scene}</span>
							<span class="method-badge">{session.breathingMethod}</span>
							<span class="date">{formatDate(session.timestamp)}</span>
						</div>
						<div class="session-stats">
							<div class="stat">
								<span class="label">Initial Stress:</span>
								<span class="value">{session.initialStressLevel}%</span>
							</div>
							<div class="stat">
								<span class="label">Final Stress:</span>
								<span class="value">{session.finalStressLevel}%</span>
							</div>
							<div class="stat improvement">
								<span class="label">Improvement:</span>
								<span class="value">-{session.stressImprovement}%</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="action-section">
		<a href="{base}/whats_up" class="btn-primary">Start New Session</a>
	</div>
</div>
{/if}

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		font-size: 1.5rem;
		color: #667eea;
	}

	.dashboard-container {
		min-height: 100vh;
		background-image: url('/ASSETS/Forest-Scence-with-sun.png');
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		padding: 40px 20px;
		position: relative;
	}

	.dashboard-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 0;
	}

	.dashboard-container > * {
		position: relative;
		z-index: 1;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto 40px;
		color: white;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
	}

	h2 {
		font-size: 1.8rem;
		margin-bottom: 20px;
		color: white;
	}

	.btn-back {
		padding: 12px 24px;
		background: rgba(255, 255, 255, 0.2);
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		transition: all 0.2s;
	}

	.btn-back:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		max-width: 1200px;
		margin: 0 auto 40px;
	}

	.stat-card {
		background: white;
		padding: 30px;
		border-radius: 16px;
		text-align: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: bold;
		color: #667eea;
		margin-bottom: 8px;
	}

	.stat-label {
		font-size: 0.9rem;
		color: #718096;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.sessions-section {
		max-width: 1200px;
		margin: 0 auto 40px;
	}

	.empty-state {
		text-align: center;
		color: white;
		font-size: 1.2rem;
		padding: 60px 20px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 16px;
	}

	.sessions-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.session-card {
		background: white;
		padding: 24px;
		border-radius: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.session-header {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-bottom: 16px;
		align-items: center;
	}

	.scene-badge, .method-badge {
		padding: 6px 14px;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: capitalize;
	}

	.scene-badge {
		background: #e6f7ff;
		color: #0070c9;
	}

	.method-badge {
		background: #f0fdf4;
		color: #059669;
	}

	.date {
		color: #718096;
		font-size: 0.9rem;
		margin-left: auto;
	}

	.session-stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 16px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat .label {
		font-size: 0.85rem;
		color: #718096;
	}

	.stat .value {
		font-size: 1.3rem;
		font-weight: 600;
		color: #2d3748;
	}

	.stat.improvement .value {
		color: #059669;
	}

	.action-section {
		text-align: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.btn-primary {
		display: inline-block;
		padding: 16px 48px;
		background: white;
		color: #667eea;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 600;
		border-radius: 12px;
		transition: all 0.2s;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
	}
</style>
