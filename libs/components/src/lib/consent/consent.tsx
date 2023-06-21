import { cn } from '@styles';

/* eslint-disable-next-line */
export interface ConsentProps {}

export const Consent: React.FC<ConsentProps> = ({ ...props }) => {
    return (
        <div className={cn()} {...props}>
            <h1>Welcome to Consent!</h1>
        </div>
    );
};

export default Consent;
