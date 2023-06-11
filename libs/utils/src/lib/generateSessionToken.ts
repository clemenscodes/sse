import { v4 as uuidv4 } from 'uuid';

export const generateSessionToken = () => {
    const sessionToken = uuidv4();
    return sessionToken;
};
