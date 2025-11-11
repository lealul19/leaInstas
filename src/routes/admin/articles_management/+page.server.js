import { createConnection } from '$lib/db/mysql'; // Imports the function to create a MySQL database connection
import { error, redirect } from '@sveltejs/kit'; // Imports error and redirect helpers from SvelteKit

export async function load({ locals }) {
	// Check if the user is logged in and is an admin
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(302, '/login'); // Redirect to login page if user is not authorized
	}

	// Create a connection to the database
	const connection = await createConnection();

	// Execute a SQL query to fetch all articles ordered by ID (latest first)
	const [articles] = await connection.execute('SELECT * FROM articles ORDER BY id DESC');

	// Return the articles to the page
	return { articles };
}

export const actions = {
	delete: async ({ request }) => { // Defines an action to delete an article
		const form = await request.formData(); // Reads form data from the request
		const id = form.get('id'); // Gets the article ID from the form

		// Check if an ID is provided
		if (!id) {
			throw error(400, { message: 'Missing article ID' }); // Return error if no ID is provided
		}

		// Create a connection to the database
		const connection = await createConnection();

		// Execute a SQL query to delete the article with the given ID
		await connection.execute('DELETE FROM articles WHERE id = ?', [id]);

		// Return a success message
		return { success: true };
	}
};
