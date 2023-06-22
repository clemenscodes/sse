import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { noteSchema, youtubeSchema, type NoteSchema } from '@utils';
import axios from 'axios';
import { YouTubeException } from '../../filter/youtube.filter';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(public schema = noteSchema) {}
    async transform(value: T) {
        const parsed = await this.schema.parseAsync(value);
        if (!parsed.attachment) {
            return parsed;
        }
        const videoId = parsed.attachment;
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
                return parsed;
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
    }
}
