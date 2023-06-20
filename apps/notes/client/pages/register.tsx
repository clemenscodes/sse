import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@pages').then((mod) => mod.Register));

export default Register;
