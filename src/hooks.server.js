import { createConnection } from './lib/db/mysql'; // Importiert die Funktion zur Verbindung mit der MySQL-Datenbank

export const handle = async ({ event, resolve }) => { // Definiert den globalen Handle-Hook für jede eingehende Anfrage
    const session = event.cookies.get('session'); // Holt das Session-Cookie aus der Anfrage

    if (!session) { // Wenn kein Session-Cookie vorhanden ist
        return await resolve(event); // Fahre fort ohne Benutzerdaten zu laden
    }

    const db = await createConnection(); // Stellt eine Verbindung zur Datenbank her
    const [users] = await db.query('SELECT * FROM users WHERE session_token = ?', [session]); // Sucht nach einem Benutzer mit dem passenden Session-Token

    if (users.length === 0) { // Wenn kein Benutzer mit diesem Token gefunden wurde
        event.cookies.set('session', '', { // Löscht das Session-Cookie
            path: '/', // Gültigkeit für die gesamte Seite
            maxAge: -1 // Sofort ablaufen lassen (löschen)
        });
        return await resolve(event); // Fahre ohne Benutzer fort
    }

    event.locals.user = users[0]; // Speichert den gefundenen Benutzer im `locals`, damit er in Load-Funktionen verfügbar ist
    return await resolve(event); // Fahre mit dem verarbeiteten Benutzer fort
};
