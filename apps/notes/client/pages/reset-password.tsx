import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(() =>
    import('@pages').then((mod) => mod.ResetPasswordPage)
);

export default ResetPasswordPage;
