
// Import the function to connect to the database
import { createConnection } from '$lib/db/mysql';

// Handle GET request
export async function GET({ params }) {
	const { uuid } = params;
	const connection = await createConnection();
	// Get top 25 articles ordered by most votes
	const [rows] = await connection.execute('SELECT * FROM articles order by votes desc limit 25');

	// Return the articles as JSON
	return new Response(JSON.stringify(rows), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
}