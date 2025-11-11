import { createConnection } from '$lib/db/mysql'; // Import the function to create a MySQL database connection
import { error } from '@sveltejs/kit'; // Import the SvelteKit error helper

export async function load() { // Load function runs when the page is accessed
	const connection = await createConnection(); // Create a connection to the database

	const [images] = await connection.execute(`
		SELECT * FROM articles ORDER BY votes DESC
	`); // Get all articles from the database, ordered by vote count (highest first)

	// Fetch all comments, ordered by creation date (latest first)
	const [allComments] = await connection.execute(`
		SELECT * FROM comments ORDER BY created_at DESC
	`);

	const commentsByArticle = {}; // Initialize an object to group comments by article

	for (const comment of allComments) { // Loop through all comments
		if (!commentsByArticle[comment.article_id]) { // If no array exists for this article yet
			commentsByArticle[comment.article_id] = []; // Create a new array for this article ID
		}
		commentsByArticle[comment.article_id].push(comment); // Add the comment to the corresponding article
	}

	return { images, commentsByArticle }; // Return the articles and grouped comments to the page
}

export const actions = {
	upvote: async ({ request }) => { // Define an action for upvoting an article
		const form = await request.formData(); // Get the form data from the request
		const id = form.get('id'); // Get the article ID from the form

		const connection = await createConnection(); // Create a database connection

		await connection.execute(`UPDATE articles SET votes = votes + 1 WHERE id = ?`, [id]); // Increase the vote count for the given article

		return { success: true }; // Return a success response
	},

	comment: async ({ request }) => { // Define an action for adding a comment
		const form = await request.formData(); // Get the form data
		const name = form.get('name'); // Get the name of the commenter
		const text = form.get('text'); // Get the comment text
		const article_id = form.get('article_id'); // Get the related article ID

		// Check that all required fields are present
		if (!name || !text || !article_id) {
			throw error(400, { message: 'Missing fields' }); // Throw a 400 error if any field is missing
		}

		const connection = await createConnection(); // Create a database connection

		// Insert the new comment into the database
		await connection.execute(
			`INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)`,
			[article_id, name, text]
		);

		return { success: true }; // Return a success response
	}
};
