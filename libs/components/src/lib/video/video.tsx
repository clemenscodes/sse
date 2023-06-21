import { cn } from '@styles';

export type VideoProps = React.ComponentPropsWithoutRef<'iframe'> & {
    videoId: string;
};

export const Video: React.FC<VideoProps> = ({ videoId, ...props }) => {
    const src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return (
        <div className={cn()}>
            <iframe
                data-cookieblock-src={src}
                data-cookieconsent={'marketing'}
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                {...props}
            />
        </div>
    );
};

export default Video;
