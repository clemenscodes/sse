import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { noteSchema, type NoteSchema } from '@utils';
import { YouTubeException } from '../../filter/youtube.filter';
import { validateVideoId } from './validateVideoId';

@Injectable()
export class NotePipe<T extends NoteSchema> implements PipeTransform<T> {
    constructor(private readonly schema = noteSchema) {}

    async transform(value: T) {
        const parsed = await this.schema.parseAsync(value);
        if (!parsed.attachment) {
            return parsed;
        }
        const validVideoId = await validateVideoId(value.attachment);
        if (validVideoId) {
            return parsed;
        }
        throw new YouTubeException(
            HttpStatus.NOT_ACCEPTABLE,
            'YouTube video id is invalid'
        );
    }
}
