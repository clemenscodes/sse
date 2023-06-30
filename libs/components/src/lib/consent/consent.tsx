import { cn } from '@styles';
import { useState } from 'react';
import { Button } from '../button/button';

export type ConsentProps = React.ComponentPropsWithoutRef<'div'>;

export const Consent: React.FC<ConsentProps> = ({ children, ...props }) => {
    const [consentEnabled, setConsentEnabled] = useState(false);

    const handleEnableConsent = () => {
        setConsentEnabled(true);
    };

    return (
        <div
            className={cn(
                consentEnabled ||
                    'flex h-full w-full flex-col items-center justify-center rounded border p-2 shadow'
            )}
            {...props}
        >
            {consentEnabled ? (
                children
            ) : (
                <>
                    <h2 className={cn('m-4 text-xl font-semibold')}>
                        Embedded YouTube Video
                    </h2>
                    <p>We respect your privacy.</p>
                    <p>You need to explicitly accept to render the video.</p>
                    <Button
                        className={cn('my-4')}
                        onClick={handleEnableConsent}
                    >
                        Accept
                    </Button>
                </>
            )}
        </div>
    );
};

export default Consent;
