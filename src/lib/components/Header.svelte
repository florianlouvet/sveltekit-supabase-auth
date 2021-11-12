<script>
	import { page, session } from '$app/stores';
	import supabase from '$lib/supabase';
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.path === '/'}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:active={$page.path === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<!-- <li class:active={$page.path === '/messages'}>
				<a sveltekit:prefetch href="/messages">Todos</a>
			</li> -->
		</ul>
		<ul>
			{#if !$session.user}
				<li class:active={$page.path === '/signin'}>
					<a sveltekit:prefetch href="/signin">Sign In</a>
				</li>
				<li class:active={$page.path === '/signup'}>
					<a sveltekit:prefetch href="/signup">Sign Up</a>
				</li>
			{:else if $session.user}
				<li class="greetings">Welcome, {$session.user.email}</li>
				<li class="a-like" on:click={() => supabase.auth.signOut()}>
					Sign out
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		flex: 1;
		justify-content: space-between;
		background-color: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a,
	nav .a-like {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	nav .greetings {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--accent-color);
		font-weight: 500;
		font-size: 0.9rem;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover,
	.a-like:hover {
		color: var(--accent-color);
		cursor: pointer;
	}
</style>
