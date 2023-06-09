import dynamic from 'next/dynamic';

const Signout = dynamic(() => import('@pages').then((mod) => mod.Signout));

export default Signout;
