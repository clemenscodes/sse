export type VideoProps = React.ComponentPropsWithoutRef<'iframe'> & {
    videoId: string;
};

export const Video: React.FC<VideoProps> = ({ videoId, ...props }) => {
    const src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return (
        <iframe
            src={src}
            allow='encrypted-media'
            allowFullScreen
            title='video'
            {...props}
        />
    );
};

export default Video;
