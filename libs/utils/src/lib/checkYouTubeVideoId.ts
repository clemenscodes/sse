export const checkYouTubeVideoId = (videoId: string) => {
    const img = new Image();
    const src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
    img.src = src;
    return new Promise<boolean>((resolve) => {
        img.onload = () => {
            resolve(true);
        };

        img.onerror = () => {
            resolve(false);
        };
    });
};
