import adapter from '@sveltejs/adapter-auto';  // Import the default SvelteKit adapter that auto-selects based on environment

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter() // Initialize the auto adapter
	}
};

export default config;// Export the SvelteKit configuration for Vite and Kit integration
