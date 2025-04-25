import { createConnection } from '$lib/db/mysql';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(302, '/login');
	}

	const connection = await createConnection();
	const [articles] = await connection.execute('SELECT * FROM articles ORDER BY id DESC');

	return { articles };
}

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('id');

		if (!id) {
			throw error(400, { message: 'Missing article ID' });
		}

		const connection = await createConnection();
		await connection.execute('DELETE FROM articles WHERE id = ?', [id]);

		return { success: true };
	}
};
