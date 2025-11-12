<script>
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages.js'; // import translations

	let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-4">{m.page_title()}</h1>

<!-- Grid layout for displaying images -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
	{#each data.images as img}
		<div class="bg-white rounded-xl shadow overflow-hidden">
			<img src={img.image} alt={img.description} class="w-full h-64 object-cover" />

			<div class="p-4">
				<h2 class="font-bold">{img.description}</h2>
				<p class="text-sm text-gray-500 mb-1">{m.by_author({ author: img.author })}</p>
				<p class="text-pink-600 font-semibold mb-2">
					{m.upvotes_label({ votes: img.votes })}
				</p>

				<form method="POST" action="?/upvote" use:enhance>
					<input type="hidden" name="id" value={img.id} />
					<button
						class="mb-4 px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
						type="submit">
						{m.upvote_btn()}
					</button>
				</form>

				<h3 class="text-sm font-semibold mb-2">{m.comments_title()}</h3>
				{#if data.commentsByArticle[img.id]?.length}
					<ul class="mb-4 space-y-2">
						{#each data.commentsByArticle[img.id] as comment}
							<li class="border border-gray-200 rounded p-2">
								<p class="font-semibold">{comment.name}</p>
								<p class="text-sm text-gray-600">{comment.text}</p>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-sm italic text-gray-400 mb-4">
						{m.no_comments()}
					</p>
				{/if}

				<form method="POST" action="?/comment" use:enhance class="space-y-2">
					<input type="hidden" name="article_id" value={img.id} />
					<input
						name="name"
						placeholder={m.comment_name_placeholder()}
						required
						class="w-full p-2 border rounded text-sm"
					/>
					<textarea
						name="text"
						placeholder={m.comment_text_placeholder()}
						required
						class="w-full p-2 border rounded text-sm"
					></textarea>
					<button
						class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded hover:from-pink-600 hover:to-purple-600">
						{m.comment_submit_btn()}
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
