import { createConnection } from '$lib/db/mysql';
import { error } from '@sveltejs/kit';

export async function load() {
	const connection = await createConnection();
	const [images] = await connection.execute(`
		SELECT * FROM articles ORDER BY votes DESC
	`);

	// Fetch all comments grouped by article
	const [allComments] = await connection.execute(`
		SELECT * FROM comments ORDER BY created_at DESC
	`);

	const commentsByArticle = {};
	for (const comment of allComments) {
		if (!commentsByArticle[comment.article_id]) {
			commentsByArticle[comment.article_id] = [];
		}
		commentsByArticle[comment.article_id].push(comment);
	}

	return { images, commentsByArticle };
}

export const actions = {
	upvote: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		const connection = await createConnection();
		await connection.execute(`UPDATE articles SET votes = votes + 1 WHERE id = ?`, [id]);

		return { success: true };
	},

	comment: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name');
		const text = form.get('text');
		const article_id = form.get('article_id');

		if (!name || !text || !article_id) {
			throw error(400, { message: 'Missing fields' });
		}

		const connection = await createConnection();
		await connection.execute(
			`INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)`,
			[article_id, name, text]
		);

		return { success: true };
	}
};
