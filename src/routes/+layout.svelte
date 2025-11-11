<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { t, setLocale, locale } from '$lib/i18n';
	import { get } from 'svelte/store';

	let { children } = $props();

	let currentLang = $state('en');
	let showLangMenu = $state(false);

	function selectLang(lang) {
		setLocale(lang);
		currentLang = lang;
		showLangMenu = false;
	}

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('lang');
			if (saved) {
				setLocale(saved);
				currentLang = saved;
			}
		}
	});
</script>

<div class="min-h-screen flex flex-col font-sans bg-white text-gray-900">

	<!-- Header -->
	<header class="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg">
		<div class="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
			
			<!-- Logo -->
			<div class="text-2xl font-black">📸 LeaInstas</div>

			<!-- Navigation -->
			<nav class="flex flex-wrap justify-center gap-6 text-sm font-medium">
				<a href="/" class="hover:underline">{t('nav.home')}</a>
				<a href="/admin/articles_management" class="hover:underline">{t('nav.articles')}</a>
				<a href="/admin/articles_management/upload" class="hover:underline">{t('nav.upload')}</a>
			</nav>

			<!-- Buttons -->
			<div class="flex gap-3 items-center relative">
				<a href="/login" class="bg-white text-pink-600 px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition">
					{t('btn.login')}
				</a>
				<a href="/register" class="bg-transparent border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-pink-600 transition">
					{t('btn.register')}
				</a>

				<!-- 🌍 Language Dropdown -->
				<div class="relative">
					<button
						class="bg-white text-pink-600 px-4 py-1.5 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition flex items-center gap-2"
						on:click={() => (showLangMenu = !showLangMenu)}>
						🌍 {currentLang.toUpperCase()}
					</button>

					{#if showLangMenu}
						<div class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 text-gray-700 w-36 z-50">
							<button on:click={() => selectLang('en')} class="block w-full text-left px-3 py-1 hover:bg-gray-100">🇬🇧 English</button>
							<button on:click={() => selectLang('de')} class="block w-full text-left px-3 py-1 hover:bg-gray-100">🇩🇪 Deutsch</button>
							<button on:click={() => selectLang('sq')} class="block w-full text-left px-3 py-1 hover:bg-gray-100">🇦🇱 Shqip</button>
							<button on:click={() => selectLang('it')} class="block w-full text-left px-3 py-1 hover:bg-gray-100">🇮🇹 Italiano</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- Inhalt -->
	<main class="flex-grow container mx-auto p-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-gray-900 text-gray-300 text-sm mt-12 pt-10">
		<div class="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">

			<!-- Beschreibung -->
			<div>
				<h2 class="text-white font-semibold mb-2">📷 LeaInstas</h2>
				<p>{t('footer.desc')}</p>
			</div>

			<!-- Navigation -->
			<div>
				<h2 class="text-white font-semibold mb-2">Navigation</h2>
				<div class="flex flex-col gap-1">
					<a href="/" class="hover:underline">{t('nav.home')}</a>
					<a href="/admin/articles_management/upload" class="hover:underline">{t('nav.upload')}</a>
				</div>
			</div>

			<!-- Social -->
			<div>
				<h2 class="text-white font-semibold mb-2">{t('footer.follow')}</h2>
				<div class="flex items-center gap-4">
					<a href="mailto:example@mail.com" class="hover:text-white">📧 Email</a>
					<a href="https://www.instagram.com" class="hover:text-white">📸 Instagram</a>
					<a href="https://x.com" class="hover:text-white">🐦 Twitter</a>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-700 text-center py-4 text-xs">
			© 2025 LeaInstas – {t('footer.copy')}
		</div>
	</footer>
</div>
