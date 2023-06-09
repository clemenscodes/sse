import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('@pages').then((mod) => mod.Signup));

export default Signup;
