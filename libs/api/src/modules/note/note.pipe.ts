import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { noteSchema, sanitizeInput, type NoteSchema } from '@utils';
import axios from 'axios';
import { YouTubeException } from '../../filter/youtube.filter';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(public schema = noteSchema) {}
    async transform(value: T) {
        this.schema.parseAsync(value);
        value.content = await sanitizeInput(value.content);
        if (!value.attachment) {
            return value;
        }
        const videoId = value.attachment;
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/default.jpg`;
        try {
            const response = await axios.get(thumbnailUrl);
            if (response.status === 200) {
                return value;
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
