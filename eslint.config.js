import prettier from 'eslint-config-prettier'; // Disables ESLint rules that might conflict with Prettier formatting
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat'; // Helps ESLint respect .gitignore file entries
import svelte from 'eslint-plugin-svelte'; // ESLint plugin for linting Svelte files
import globals from 'globals'; // Provides predefined global variables (e.g., browser, node)
import { fileURLToPath } from 'node:url'; // Converts file URLs to file paths
import svelteConfig from './svelte.config.js'; // Imports your SvelteKit configuration for parsing Svelte files

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url)); // Converts .gitignore URL to a usable file path

export default [
	includeIgnoreFile(gitignorePath), // Tells ESLint to ignore files listed in .gitignore
	js.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node } // Defines both browser and Node.js global variables
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.js'], // Target only Svelte files for the config below
		languageOptions: { parserOptions: { svelteConfig } } // Use your Svelte config when parsing these files
	}
];
