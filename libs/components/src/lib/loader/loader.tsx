import { cn } from '@styles';

export type LoaderProps = React.ComponentPropsWithoutRef<'div'>;

export const Loader: React.FC<LoaderProps> = ({ ...props }) => {
    return (
        <div className={cn()} {...props}>
            <h1>Welcome to Loader!</h1>
        </div>
    );
};

export default Loader;
