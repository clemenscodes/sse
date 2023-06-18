import { withAuth } from '@composer';
import dynamic from 'next/dynamic';

const Note = dynamic(() => import('@pages').then((mod) => mod.Note));

export default withAuth(Note);
