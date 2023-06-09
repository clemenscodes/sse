import dynamic from 'next/dynamic';

const Signin = dynamic(() => import('@pages').then((mod) => mod.Signin));

export default Signin;
