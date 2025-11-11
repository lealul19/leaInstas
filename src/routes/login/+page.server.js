import  { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        // Get email and password from submitted form
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        // Attempt to log in and receive a session token
        const token = await login(email, password);

        if (token) {
            // Set a secure cookie to store session token for 7 days
            cookies.set('session', token, {
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
                httpOnly: true,
                sameSite: 'strict'
            });
         // Redirect user to homepage after successful login
            redirect(302, '/');
        } else {
         // Return error info if login failed
            return {
                success: false,
                message: 'Login failed'
            };
        }

    }
};    