import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refresh-token')
export class RefreshTokenController {
    constructor(private readonly refreshTokenService: RefreshTokenService) {}

    @Post()
    async createRefreshToken(
        @Body() data: Parameters<typeof this.refreshTokenService.create>[0]
    ) {
        return await this.refreshTokenService.create(data);
    }

    @Get(':id')
    async findRefreshTokenById(@Param('id') id: string) {
        return await this.refreshTokenService.findById(id);
    }

    @Delete(':id')
    async deleteRefreshToken(@Param('id') id: string) {
        return await this.refreshTokenService.delete(id);
    }
}
