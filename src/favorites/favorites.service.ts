import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
    constructor(
    @InjectRepository(Favorite) private favRepo: Repository<Favorite>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async addFavorite(userId: number, productId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!user || !product) throw new NotFoundException();

    const existing = await this.favRepo.findOne({ where: { user, product } });
    if (existing) throw new ConflictException('Product already in favorites');

    const favorite = this.favRepo.create({ user, product });
    return this.favRepo.save(favorite);
  }

  

  async removeFavorite(userId: number, productId: number) {
    return this.favRepo.delete({ user: { id: userId }, product: { id: productId } });
  }

  async getFavorites(userId: number) {
    return this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}
