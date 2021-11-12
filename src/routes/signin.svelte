<script context="module">
	export async function load({ page }) {
		const error = page.query.get('error');
		if (error) {
			return {
				props: {
					error: error,
				},
			};
		}
		return {};
	}
</script>

<script>
	import supabase from '$lib/supabase';
	let form_error;
	let loading = false;
	let email = '';
	let password = '';

	const submitSignIn = async () => {
		loading = true;
		const { error } = await supabase.auth.signIn({ email, password });
		if (error) form_error = error.message;
		loading = false;
	};
</script>

<div>
	<form on:submit|preventDefault={submitSignIn}>
		{#if form_error}
			<p>{form_error}</p>
		{/if}
		<input
			name="email"
			id="email"
			aria-label="Email"
			placeholder="your@email.com"
			bind:value={email}
		/>
		<input
			type="password"
			name="password"
			aria-label="Password"
			placeholder="Password"
			id="password"
			bind:value={password}
		/>
		<button type="submit">
			{#if loading}
				Loading...
			{:else}
				Submit
			{/if}
		</button>
	</form>
</div>
