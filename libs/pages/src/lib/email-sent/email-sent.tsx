import { cn } from '@styles';

export function EmailSentPage() {
    return (
        <div className={cn('flex flex-col items-center')}>
            <h1 className={cn('text-4xl font-bold mb-4')}>Password Reset</h1>
            <p className={cn('text-lg text-gray-500')}>
                An email with a password reset link has been sent to your email.
            </p>
            <p className={cn('text-lg text-gray-500')}>
                Check your inbox and click on the link to proceed!
            </p>
        </div>
    );
}

export default EmailSentPage;
