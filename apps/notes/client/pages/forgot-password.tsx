import dynamic from 'next/dynamic';

const ForgotPasswordPage = dynamic(() =>
    import('@pages').then((mod) => mod.ForgotPasswordPage)
);

export default ForgotPasswordPage;
