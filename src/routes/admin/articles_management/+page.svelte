<script>
	export let data;
</script>

<div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
	<h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Hochgeladene Bilder</h1>

	{#if data.articles.length === 0}
		<p class="text-center text-gray-500">Keine Artikel gefunden.</p>
	{:else}
		<ul class="space-y-6">
			{#each data.articles as article}
				<li class="border border-gray-200 rounded-lg p-4 shadow-sm">
					<img src={article.image} alt="Uploaded Image" class="w-full max-h-64 object-cover rounded-lg mb-4" />

					<p class="text-gray-700"><strong>Autor:</strong> {article.author}</p>
					<p class="text-gray-600"><strong>Beschreibung:</strong> {article.description}</p>

					<form method="POST" action="?/delete" class="mt-4">
						<input type="hidden" name="id" value={article.id} />
						<button type="submit"
							class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
							Löschen
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>
