<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
	<form
		action="?/register"
		method="POST"
		use:enhance
		class="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-5"
	>
		<h1 class="text-2xl font-bold text-center text-pink-600">Registrieren bei LeaInstas 📸</h1>

		<div>
			<label for="username" class="block text-sm font-medium text-gray-700">Benutzername</label>
			<input
				type="text"
				name="username"
				id="username"
				required
				class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
			/>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
			<input
				type="email"
				name="email"
				id="email"
				required
				class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white font-semibold py-2.5 rounded-lg shadow hover:opacity-90 transition"
		>
			Registrieren
		</button>

		{#if form}
			<Warning message={form.message} />
		{/if}

		<p class="text-sm text-center text-gray-600">
			Schon ein Konto?
			<a href="/login" class="text-pink-600 hover:underline">Hier einloggen</a>
		</p>
	</form>
</div>