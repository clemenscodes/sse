import { type SessionOptions, type SessionStrategy } from 'next-auth';

export const sessionCookieName = 'next-auth.session-token';

// Choose how you want to save the user session.
// The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
// If you use an `adapter` however, we default it to `"database"` instead.
// You can still force a JWT session by explicitly defining `"jwt"`.
// When using `"database"`, the session cookie will only contain a `sessionToken` value,
// which is used to look up the session in the database.
export const strategy: SessionStrategy = 'jwt';
// Seconds - How long until an idle session expires and is no longer valid.
export const maxAge = 30 * 24 * 60 * 60; // 30 days
// Seconds - Throttle how frequently to write to database to extend a session.
// Use it to limit write operations. Set to 0 to always update the database.
// Note: This option is ignored if using JSON Web Tokens
export const updateAge = 24 * 60 * 60; // 24 hours

export const session: Partial<SessionOptions> = {
    strategy,
    maxAge,
    updateAge,
};
