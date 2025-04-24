<script>
	let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-4">Top Bilder ⭐</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
	{#each data.images as img}
		<div class="bg-white rounded-xl shadow overflow-hidden">
			<a href={img.image} target="_blank">
				<img src={img.image} alt={img.description} class="w-full h-64 object-cover" />
			</a>
			<div class="p-4">
				<h2 class="font-bold">{img.description}</h2>
				<p class="text-sm text-gray-500">von {img.username}</p>
			</div>
		</div>
	{/each}
</div>