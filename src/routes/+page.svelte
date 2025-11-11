<script>
	import { enhance } from '$app/forms'; // Imports the 'enhance' function to enable progressive enhancement for forms
	let { data } = $props(); // Destructures the 'data' prop passed from the server-side load function
</script>

<h1 class="text-2xl font-bold mb-4">Welcome to my Insta-Clone</h1>

<!-- Grid layout for displaying images -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
	{#each data.images as img} <!-- Loop through each image -->
		<div class="bg-white rounded-xl shadow overflow-hidden"> <!-- Card container -->
			<img src={img.image} alt={img.description} class="w-full h-64 object-cover" /> <!-- Display the image -->

			<div class="p-4"> <!-- Content section -->
				<h2 class="font-bold">{img.description}</h2> <!-- Image description -->
				<p class="text-sm text-gray-500 mb-1">von {img.author}</p> <!-- Author name -->
				<p class="text-pink-600 font-semibold mb-2">Upvotes: {img.votes}</p> <!-- Vote count -->

				<!-- Upvote form -->
				<form method="POST" action="?/upvote" use:enhance> <!-- Enhance allows form to work without full reload -->
					<input type="hidden" name="id" value={img.id} /> <!-- Hidden input to send article ID -->
					<button
						class="mb-4 px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
						type="submit">
						Upvote <!-- Upvote button -->
					</button>
				</form>

				<!-- Comment section -->
				<h3 class="text-sm font-semibold mb-2">Kommentare:</h3>
				{#if data.commentsByArticle[img.id]?.length} <!-- If there are comments for this article -->
					<ul class="mb-4 space-y-2">
						{#each data.commentsByArticle[img.id] as comment} <!-- Loop through comments -->
							<li class="border border-gray-200 rounded p-2">
								<p class="font-semibold">{comment.name}</p> <!-- Commenter name -->
								<p class="text-sm text-gray-600">{comment.text}</p> <!-- Comment text -->
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-sm italic text-gray-400 mb-4">Keine Kommentare vorhanden.</p> <!-- No comments -->
				{/if}

				<!-- Comment form -->
				<form method="POST" action="?/comment" use:enhance class="space-y-2">
					<input type="hidden" name="article_id" value={img.id} /> <!-- Hidden article ID -->
					<input
						name="name"
						placeholder="Dein Name"
						required
						class="w-full p-2 border rounded text-sm"
					/> <!-- Input for commenter name -->
					<textarea
						name="text"
						placeholder="Dein Kommentar"
						required
						class="w-full p-2 border rounded text-sm"
					></textarea> <!-- Text area for comment -->
					<button
						class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded hover:from-pink-600 hover:to-purple-600">
						Kommentieren <!-- Submit button for comment -->
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
