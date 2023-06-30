import { youtubeSchema } from './youtubeSchema';

describe('youtubeSchema', () => {
    const videoId = '6UxGwMUya3g';

    it('should validate normal youtube url', () => {
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });

    it('should validate even if its not part of url', () => {
        expect(() => youtubeSchema.parse(videoId)).not.toThrow();
    });

    it('should validate share youtube url', () => {
        const url = `https://youtu.be/${videoId}`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });

    it('should validate share youtube url with start time', () => {
        const url = `https://youtu.be/${videoId}?t=6`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });

    it('should validate mobile browser youtube url', () => {
        const url = `https://m.youtube.com/watch?v=${videoId}&list=RD12345678901&start_radio=1`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });

    it('should validate long youtube url with start time', () => {
        const url = `https://www.youtube.com/watch?v=${videoId}&list=RD12345678901&start_radio=1&rv=12345678901&t=38`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });

    it('should validate youtube shorts url', () => {
        const url = `https://youtube.com/shorts/${videoId}`;
        const id = youtubeSchema.parse(url);
        expect(id).toBe(videoId);
    });
});
