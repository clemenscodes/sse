import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';

export interface RedirectProps {
    href: string;
}

export const Redirect: React.FC<RedirectProps> = ({ href }) => {
    const [routerUsed, setRouterUsed] = useState(false);
    const router = useRouter();

    useLayoutEffect(() => {
        if (routerUsed) {
            return;
        }
        router.push(href);
        setRouterUsed(true);
    }, [href, router, routerUsed]);

    return null;
};

export default Redirect;
