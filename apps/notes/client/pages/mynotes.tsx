import dynamic from 'next/dynamic';

const Mynotes = dynamic(() => import('@pages').then((mod) => mod.Mynotes));

export default Mynotes;
