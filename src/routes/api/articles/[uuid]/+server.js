// Import the function to connect to the database
import { createConnection } from '$lib/db/mysql';

// Handle GET request with article ID from URL
export async function GET({ params }) {
	const { uuid } = params; // Get the article ID from the URL
	const connection = await createConnection();
	// Get the article from the database by ID
	const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [uuid]);

	const article = rows[0]; // Take the first (and only) result
	// Return the article as JSON
	return new Response(JSON.stringify(article), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
}