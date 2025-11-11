import { put } from "@vercel/blob";
import { createConnection } from "$lib/db/mysql";
import { error} from "@sveltejs/kit";
import { BLOB_READ_WRITE_TOKEN } from "$env/static/private";
import { upload } from "@vercel/blob/client";
import { redirect } from "@sveltejs/kit";

export function load({ locals }) {
    	// Only allow access if user is an admin
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(302, '/login'); // Redirect unauthorized users to login
	}

	return {
		user: locals.user // Pass current user info to the page
	};
}

export const actions = {
    upload: async ({ request }) => {
        const connection = await createConnection();
        const data = await request.formData();
    
        const image = data.get('image');
        const description = data.get('description');
        const author = data.get('author');
    		// Ensure an image file was uploaded
        if (!image) {
            throw error(400, { message: 'No file to upload' });
        }
    // Generate a unique file name for the uploaded image
        const uniqueName = `${Date.now()}-${image.name}`;

        		// Upload image to Vercel Blob storage with public access
        const { url } = await put(uniqueName, image, {
            access: 'public',
            token: BLOB_READ_WRITE_TOKEN
        });
    		// Save the uploaded image info to the database
        const [result] = await connection.execute(
            'INSERT INTO articles (image, description, author) VALUES (?, ?, ?)',
            [url, description, author]
        );
    		// Redirect to homepage if upload and save were successful
      if (result.affectedRows) {
            throw redirect(303, '/');
        }
    		// Return uploaded image URL as a fallback
        return {
            uploaded: url
        };
    }
    
}