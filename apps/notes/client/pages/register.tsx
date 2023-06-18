import { withoutAuth } from '@composer';
import dynamic from 'next/dynamic';

const RegisterPage = dynamic(() =>
    import('@pages').then((mod) => mod.RegisterPage)
);

export default withoutAuth(RegisterPage);
