import { createConnection } from '$lib/db/mysql';

export async function load() {
	const connection = await createConnection();
	const [images] = await connection.execute(`
		select * from articles
	`);
	return { images };
}
