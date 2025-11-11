import { register } from '$lib/db/auth'; // Import the custom register function from the auth module
import { redirect } from '@sveltejs/kit'; // Import redirect helper from SvelteKit

export const actions = {
	register: async ({ request, cookies }) => { // Define a `register` action for the registration form
		const formData = await request.formData(); // Read the submitted form data
		const email = formData.get('email'); // Get the email field
		const password = formData.get('password'); // Get the password field
		const username = formData.get('username'); // Get the username field

		// Basic email validation
		if (!email || !email.includes('@') || !email.includes('.')) {
			return {
				success: false,
				message: 'Bitte gib eine gültige E-Mail-Adresse ein.' // "Please enter a valid email address."
			};
		}

		// Basic password validation
		if (!password || password.length < 8) {
			return {
				success: false,
				message: 'Das Passwort muss mindestens 8 Zeichen lang sein.' // "The password must be at least 8 characters long."
			};
		}

		// Call the register function with email, username, and password
		const { token, message } = await register(email, username, password);

		// If registration was successful and a session token was returned
		if (token) {
			cookies.set('session', token, { // Set a secure session cookie
				maxAge: 60 * 60 * 24 * 7, // Valid for 7 days
				path: '/', // Cookie is valid across the whole site
				httpOnly: true, // Cookie is not accessible via JavaScript
				sameSite: 'strict' // Protect against CSRF
			});
			redirect(302, '/'); // Redirect to homepage after successful registration
		} else {
			// If registration failed, return the error message
			return {
				success: false,
				message: message
			};
		}
	}
};
