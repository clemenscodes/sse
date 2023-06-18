import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@pages').then((mod) => mod.Login));

export default Login;
