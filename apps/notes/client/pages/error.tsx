import dynamic from 'next/dynamic';

const Error = dynamic(() => import('@pages').then((mod) => mod.Error));

export default Error;
