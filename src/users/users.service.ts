import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'; 


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: Partial<User>): Promise<User> {
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
}
