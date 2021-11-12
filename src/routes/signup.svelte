<script context="module">
	export const prerender = true;
</script>

<script>
	import supabase from '$lib/supabase';
	let signed_up = false;
	let form_error;
	let loading = false;

	let email = '';
	let password = '';

	const submitSignUp = async () => {
		loading = true;
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) form_error = error.message;
		else signed_up = true;
		loading = false;
	};
</script>

<div>
	{#if !signed_up}
		<form on:submit|preventDefault={submitSignUp}>
			{#if form_error}
				<p>{form_error}</p>
			{/if}
			<input
				name="email"
				aria-label="Email"
				placeholder="your@email.com"
				bind:value={email}
			/>
			<input
				type="password"
				name="password"
				aria-label="Password"
				placeholder="Password"
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
	{:else}
		<p>
			You have been signed up, you should receive an email to activate your
			account.
		</p>
	{/if}
</div>
