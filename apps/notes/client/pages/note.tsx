import dynamic from 'next/dynamic';

const Note = dynamic(() => import('@pages').then((mod) => mod.Note));

export default Note;
