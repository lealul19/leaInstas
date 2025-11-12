<script>
	import '../app.css';
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime.js';
	import { onMount } from 'svelte';

	let { children } = $props();
	let currentLocale = $state(getLocale());

	// Load saved language
	onMount(() => {
		const saved = localStorage.getItem('lang');
		if (saved && locales.includes(saved)) {
			setLocale(saved);
			currentLocale = saved;
		}
	});

	// Change language
	function changeLang(newLocale) {
		setLocale(newLocale);
		localStorage.setItem('lang', newLocale);
		currentLocale = newLocale;
		location.reload(); // reload to apply across all pages
	}
</script>

<div class="min-h-screen flex flex-col font-sans bg-white text-gray-900">
	<!-- Header -->
	<header class="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg">
		<div class="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			<!-- Logo -->
			<div class="text-2xl font-black">📸 LeaInstas</div>

			<!-- Navigation -->
			<nav class="flex flex-wrap justify-center gap-6 text-sm font-medium">
				<a href="/" class="hover:underline">{m.nav_home()}</a>
				<a href="/admin/articles_management" class="hover:underline">{m.nav_articles()}</a>
				<a href="/admin/articles_management/upload" class="hover:underline">{m.nav_upload()}</a>
			</nav>

			<!-- Login/Register + Language Switch -->
			<div class="flex gap-3 items-center">
				<a
					href="/login"
					class="bg-white text-pink-600 px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition">
					{m.btn_login()}
				</a>
				<a
					href="/register"
					class="bg-transparent border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-pink-600 transition">
					{m.btn_register()}
				</a>

				<!-- Language Switch -->
				<div class="flex gap-2 ml-4 text-sm">
					{#each ['en', 'de', 'sq'] as l}
						<button
							onclick={() => changeLang(l)}
							class="px-2 py-1 rounded-lg border border-white hover:bg-white hover:text-pink-600 transition {currentLocale === l ? 'bg-white text-pink-600' : ''}">
							{l.toUpperCase()}
						</button>
					{/each}
				</div>
			</div>
		</div>
	</header>

	<!-- Main -->
	<main class="flex-grow container mx-auto p-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-gray-900 text-gray-300 text-sm mt-12 pt-10">
		<div class="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
			<div>
				<h2 class="text-white font-semibold mb-2">📷 LeaInstas</h2>
				<p>{m.footer_desc()}</p>
			</div>

			<div>
				<h2 class="text-white font-semibold mb-2">{m.footer_nav()}</h2>
				<div class="flex flex-col gap-1">
					<a href="/" class="hover:underline">{m.nav_home()}</a>
					<a href="/upload" class="hover:underline">{m.footer_upload()}</a>
					<a href="/top" class="hover:underline">{m.footer_top()}</a>
				</div>
			</div>

			<div>
				<h2 class="text-white font-semibold mb-2">{m.footer_follow()}</h2>
				<div class="flex items-center gap-4">
					<a href="mailto:info@example.com" class="hover:text-white">📧 Email</a>
					<a href="https://www.instagram.com" class="hover:text-white">📸 Instagram</a>
					<a href="https://x.com" class="hover:text-white">🐦 Twitter</a>
				</div>
			</div>
		</div>
		<div class="mt-8 border-t border-gray-700 text-center py-4 text-xs">
			© 2025 LeaInstas – {m.footer_copy()}
		</div>
	</footer>
</div>
