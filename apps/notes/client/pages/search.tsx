import dynamic from 'next/dynamic';

const Search = dynamic(() => import('@pages').then((mod) => mod.Search));

export default Search;
