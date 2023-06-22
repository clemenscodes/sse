import dynamic from 'next/dynamic';

const EmailSentPage = dynamic(() =>
    import('@pages').then((mod) => mod.EmailSentPage)
);

export default EmailSentPage;
