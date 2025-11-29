<script lang="ts">
  import { base } from '$app/paths';
  import { user, authHandlers } from '$lib/stores/authStore';
  
  async function handleLogout() {
    await authHandlers.logout();
  }
</script>

<div class="home-container">
  <div class="header">
    {#if $user}
      <div class="user-info">
        <span>Welcome, {$user.email}</span>
        <button on:click={handleLogout} class="btn-logout">Logout</button>
      </div>
    {:else}
      <div class="auth-links">
        <a href="{base}/login" class="btn-link">Login</a>
        <a href="{base}/signup" class="btn-link primary">Sign Up</a>
      </div>
    {/if}
  </div>

  <div class="content">
    <h1>Welcome to Solo Real-World-Sim Project</h1>
    <p>My name is alex bowes and i'm developing a Breathing exerice module for a website / app.</p>
    
    <div class="buttons">
      <a href="{base}/whats_up" class="btn-start">Start Your Session</a>
      {#if $user}
        <a href="{base}/dashboard" class="btn-dashboard">View Dashboard</a>
      {/if}
    </div>
  </div>
</div>

<style>
  .home-container {
    min-height: 100vh;
    background-image: url('/ASSETS/Forest-Scence-with-sun.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: white;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(255, 255, 255, 0.1);
    padding: 12px 20px;
    border-radius: 12px;
  }

  .auth-links {
    display: flex;
    gap: 12px;
  }

  .btn-link {
    padding: 10px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .btn-link.primary {
    background: white;
    color: #667eea;
  }

  .btn-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-logout {
    padding: 8px 20px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-logout:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 80vh;
    padding: 40px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
    max-width: 600px;
  }

  .buttons {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-start, .btn-dashboard {
    padding: 16px 40px;
    background: white;
    color: #667eea;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.2s;
  }

  .btn-dashboard {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid white;
  }

  .btn-start:hover, .btn-dashboard:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .login-prompt {
    font-size: 1rem;
    opacity: 0.9;
  }
</style>

