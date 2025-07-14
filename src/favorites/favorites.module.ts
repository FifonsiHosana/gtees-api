import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/user.entity';
import { Favorite } from './favorite.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Favorite, Product, User])],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
