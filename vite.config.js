import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite';// Import the Tailwind CSS plugin for Vite
import { sveltekit } from '@sveltejs/kit/vite';// Import the SvelteKit plugin for Vite
import { defineConfig } from 'vite';// Import the function to define Vite’s configuration


export default defineConfig({ // Export the Vite configuration
	plugins: [paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),tailwindcss(), sveltekit()]  // Initialize the Tailwind CSS plugin
	// Initialize the SvelteKit plugin
});
