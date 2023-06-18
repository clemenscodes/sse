import { withoutAuth } from '@composer';
import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('@pages').then((mod) => mod.LoginPage));

export default withoutAuth(LoginPage);
