<script context="module" lang="ts">
	const publicPages = ['/', '/signin', '/signup'];
	export async function load({ page, session }) {
		const { path } = page;
		if (publicPages.includes(path)) {
			return {};
		}

		if (!session.user) {
			return { status: 403, error: new Error('Forbidden') };
		}
	}
</script>

<script>
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	onMount(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, sess) => {
				// if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
				// Send session to /api/auth route to set the auth cookie.
				const res = await fetch('/auth.json', {
					method: 'POST',
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'same-origin',
					body: JSON.stringify({ event, session: sess }),
				});
				if (res.ok) {
					const json = await res.json();
					$session = json;
					goto('/');
				}
			}
		);
		return () => {
			authListener.unsubscribe();
		};
	});
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
