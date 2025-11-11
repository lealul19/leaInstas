<script>
	// Expects the passed-in data (e.g., from a load function)
	export let data;
</script>

<!-- Main container -->
<div class="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">

	<!-- Page heading -->
	<h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Uploaded Images</h1>

	{#if data.articles.length === 0} 
		<!-- If there are no articles -->
		<p class="text-center text-gray-500">No articles found.</p>
	{:else}
		<!-- If articles are available -->
		<ul class="space-y-6"> <!-- List of articles with spacing -->
			{#each data.articles as article}
				<!-- Loop through each article -->
				<li class="border border-gray-200 rounded-lg p-4 shadow-sm">
					<!-- Single article card -->
					<img src={article.image} alt="Uploaded Image" class="w-full max-h-64 object-cover rounded-lg mb-4" />
					<!-- Display the uploaded image -->

					<p class="text-gray-700"><strong>Author:</strong> {article.author}</p>
					<!-- Show author name -->

					<p class="text-gray-600"><strong>Description:</strong> {article.description}</p>
					<!-- Show image description -->

					<!-- Form to delete this article -->
					<form method="POST" action="?/delete" class="mt-4">
						<!-- Hidden field with the article ID -->
						<input type="hidden" name="id" value={article.id} />
						
						<!-- Delete button -->
						<button type="submit"
							class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
							Delete
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>

