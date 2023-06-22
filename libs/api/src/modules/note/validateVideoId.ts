import { HttpStatus } from '@nestjs/common';
import { Attachment } from '@prisma/api';
import { youtubeSchema } from '@utils';
import axios from 'axios';
import { YouTubeException } from '../../filter/youtube.filter';

export const validateVideoId = async (videoId: Attachment['videoId']) => {
    let parsedVideoId: string;
    try {
        parsedVideoId = youtubeSchema.parse(videoId);
    } catch {
        throw new YouTubeException(
            HttpStatus.NOT_ACCEPTABLE,
            'YouTube video id is invalid'
        );
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${parsedVideoId}/default.jpg`;
    try {
        const response = await axios.get(thumbnailUrl);
        if (response.status === 200) {
            return true;
        }
        throw new YouTubeException(
            HttpStatus.NOT_ACCEPTABLE,
            'YouTube video id is invalid'
        );
    } catch (error) {
        throw new YouTubeException(
            HttpStatus.NOT_ACCEPTABLE,
            'YouTube video id is invalid'
        );
    }
};
