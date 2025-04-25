import { createConnection } from './lib/db/mysql';

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    if (!session) {
        return await resolve(event);
    }

    const db = await createConnection();
    const [users] = await db.query('SELECT * FROM users WHERE session_token = ?', [session]);
    if (users.length === 0) {
        event.cookies.set('session', '', {
            path: '/',
            maxAge: -1
        });
        return await resolve(event);
    }

    event.locals.user = users[0];
    return await resolve(event);
};