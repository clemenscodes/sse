import { EventCallbacks } from 'next-auth';
import { prisma } from './prisma';

export const events: Partial<EventCallbacks> = {
    signOut: async ({ session }) => {
        const { sessionToken } = session;
        const data = await prisma.session.findUnique({
            where: {
                sessionToken,
            },
        });
        if (data) {
            await prisma.session.delete({
                where: {
                    sessionToken,
                },
            });
        }
    },
};
