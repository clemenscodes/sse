import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post()
    async createSession(
        @Body() data: Parameters<typeof this.sessionService.create>[0]
    ) {
        return await this.sessionService.create(data);
    }

    @Get(':id')
    async findSessionById(@Param('id') id: string) {
        return await this.sessionService.findById(id);
    }

    @Delete(':id')
    async deleteSession(@Param('id') id: string) {
        return await this.sessionService.delete(id);
    }
}
