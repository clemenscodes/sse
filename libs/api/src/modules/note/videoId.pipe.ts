import { Injectable, PipeTransform } from '@nestjs/common';
import { youtubeSchema, type YoutubeSchema } from '@utils';

@Injectable()
export class VideoIdPipe<T extends YoutubeSchema> implements PipeTransform<T> {
    constructor(private readonly schema = youtubeSchema) {}

    async transform(value: T) {
        const parsed = await this.schema.parseAsync(value);
        return parsed;
    }
}
