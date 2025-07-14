import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favService: FavoritesService) { }

    @Post(':productId')
    add(@Req() req, @Param('productId') productId: number) {
        return this.favService.addFavorite(req.user.userId, productId);
    }

    @Delete(':productId')
    remove(@Req() req, @Param('productId') productId: number) {
        return this.favService.removeFavorite(req.user.userId, productId);
    }

    @Get()
    list(@Req() req) {
        return this.favService.getFavorites(req.user.userId);
    }
    
}
