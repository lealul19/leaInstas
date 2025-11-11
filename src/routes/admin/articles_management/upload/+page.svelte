<script>
	// Get the 'data' prop passed from the server
	let { data } = $props();
</script>

<!-- Upload form container with max width and styling -->
<div class="max-w-xl mx-auto mt-12 bg-white shadow-md rounded-xl p-6">

	<!-- Page title -->
	<h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Upload Image</h1>

	<!-- Image upload form -->
	<form action="?/upload" method="POST" enctype="multipart/form-data" class="space-y-5">

		<!-- Author input field -->
		<div>
			<label for="author" class="block text-sm font-medium text-gray-700 mb-1">Author</label>
			<input type="text" name="author" id="author"
				class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent" />
		</div>

		<!-- Description input field -->
		<div>
			<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
			<input type="text" name="description" id="description"
				class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent" />
		</div>

		<!-- File input field for image upload -->
		<div>
			<label for="file" class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
			<input type="file" name="image" id="file" multiple required
				class="w-full border border-gray-300 rounded-lg p-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600" />
		</div>

		<!-- Submit button -->
		<button type="submit"
			class="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition">
			Upload
		</button>
	</form>
</div>
