import dynamic from 'next/dynamic';

const Note = dynamic(() => import('@pages').then((mod) => mod.CreateNote));

export default Note;
