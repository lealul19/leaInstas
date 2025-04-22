import { put } from "@vercel/blob";
import { createConnection } from "$lib/db/mysql";
import { error} from "@sveltejs/kit";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";
import { upload } from "@vercel/blob/client";
import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(302, '/login');
	}

	return {
		user: locals.user
	};
}

export const actions = {
    upload: async ({ request }) => {
        const connection = await createConnection();
        const data = await request.formData();
    
        const image = data.get('image');
        const description = data.get('description');
        const author = data.get('author');
    
        if (!image) {
            throw error(400, { message: 'No file to upload' });
        }
    
        const uniqueName = `${Date.now()}-${image.name}`;
        const { url } = await put(uniqueName, image, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });
    
        const [result] = await connection.execute(
            'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
            [url, description, author]
        );
    
      if (result.affectedRows) {
            throw redirect(303, '/');
        }
    
        return {
            uploaded: url
        };
    }
    
}