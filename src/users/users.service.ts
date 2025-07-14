import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { Product } from 'src/products/products.entity';
import { Favorite } from 'src/favorites/favorite.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: Partial<User>): Promise<User> {
    const existing = await this.usersRepository.findOne({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }


  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException();
    return this.usersRepository.remove(user);
  }

  async toggleFavorite(userId: number, productId: number): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const product = await this.productRepo.findOne({ where: { id: productId } });

    if (!product) throw new NotFoundException('Product not found');

    const alreadyFav = user.favorites.find(p => p.id === product.id);
    if (alreadyFav) {
      user.favorites = user.favorites.filter(p => p.id !== product.id);
    } else {

      const favorite = this.favoriteRepo.create({ user, product });
      await this.favoriteRepo.save(favorite);
      user.favorites.push(favorite);
    }

    return this.usersRepository.save(user);
  }

  async getFavorites(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.favorites;
  }

}
