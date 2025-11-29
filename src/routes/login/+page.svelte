<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { authHandlers } from '$lib/stores/authStore';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		if (!email || !password) {
			error = 'Please fill in all fields';
			return;
		}

		loading = true;
		error = '';

		const result = await authHandlers.login(email, password);
		
		if (result.success) {
			goto(`${base}/whats_up`);
		} else {
			error = result.error || 'Login failed';
		}
		
		loading = false;
	}
</script>

<div class="auth-container">
	<a href="{base}/" class="back-home">← Back to Home</a>
	<div class="auth-card">
		<h1>Welcome Back</h1>
		<p class="subtitle">Log in to continue your wellness journey</p>

		{#if error}
			<div class="error-message">{error}</div>
		{/if}

		<form on:submit|preventDefault={handleLogin}>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="your@email.com"
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="••••••••"
					required
					minlength="6"
				/>
			</div>

			<button type="submit" class="btn-primary" disabled={loading}>
				{loading ? 'Logging in...' : 'Log In'}
			</button>
		</form>

		<div class="auth-footer">
			<p>Don't have an account?</p>
			<a href="{base}/signup" class="link">Sign up</a>
			
		</div>
	</div>
</div>

<style>
	.back-home {
		position: absolute;
		top: 20px;
		left: 20px;
		color: white;
		text-decoration: none;
		font-size: 1.1rem;
		font-weight: 600;
		padding: 10px 20px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		transition: all 0.2s;
		z-index: 10;
	}

	.back-home:hover {
		background: rgba(0, 0, 0, 0.5);
		transform: translateX(-3px);
	}

	.auth-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('/ASSETS/Forest-Scence-with-sun.png');
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		padding: 20px;
		position: relative;
	}

	.back-home {
		position: absolute;
		top: 20px;
		left: 20px;
		color: white;
		text-decoration: none;
		font-size: 1.1rem;
		font-weight: 600;
		padding: 10px 20px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		transition: all 0.2s;
	}

	.back-home:hover {
		background: rgba(0, 0, 0, 0.5);
		transform: translateX(-3px);
	}

	.auth-card {
		background: white;
		border-radius: 20px;
		padding: 40px;
		width: 100%;
		max-width: 420px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 8px;
		color: #2d3748;
		text-align: center;
	}

	.subtitle {
		text-align: center;
		color: #718096;
		margin-bottom: 32px;
	}

	.error-message {
		background: #fed7d7;
		color: #c53030;
		padding: 12px;
		border-radius: 8px;
		margin-bottom: 20px;
		font-size: 0.9rem;
	}

	.form-group {
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin-bottom: 8px;
		color: #4a5568;
		font-weight: 500;
	}

	input {
		width: 100%;
		padding: 12px 16px;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
	}

	.btn-primary {
		width: 100%;
		padding: 14px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		margin-top: 10px;
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.auth-footer {
		margin-top: 24px;
		text-align: center;
		color: #718096;
	}

	.auth-footer p {
		margin-bottom: 8px;
	}

	.link {
		color: #667eea;
		font-weight: 600;
		text-decoration: none;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
