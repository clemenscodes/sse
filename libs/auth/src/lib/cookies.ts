import { CookiesOptions } from "next-auth";
import { sessionCookieName } from "./session";
import { secure } from "./secure";

export const cookies: Partial<CookiesOptions> = {
    sessionToken: {
        name: sessionCookieName,
        options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure,
        },
    },
};

