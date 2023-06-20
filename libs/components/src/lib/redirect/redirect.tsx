import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export interface RedirectProps {
    href: string;
}

export const Redirect: React.FC<RedirectProps> = ({ href }) => {
    const router = useRouter();

    useLayoutEffect(() => {
        router.push(href);
    }, [href, router]);

    return null;
};

export default Redirect;
