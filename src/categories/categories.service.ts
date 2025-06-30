// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Category } from './categories.entity';
// import { CreateCategoryDto } from './create-category.dto';
// import { UpdateCategoryDto } from './update-category.dto';

// @Injectable()
// export class CategoriesService {
//     constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepo: Repository<Category>,
//   ) {
//     console.log('CategoriesService constructed');
//   }

//   findAll() {
//     return this.categoryRepo.find();
//   }

//   findOne(id: number) {
//     return this.categoryRepo.findOne({ where: { id } });
//   }
//   // Category Methods
//   async getCategories() {
//     return this.categoryRepo.find();
//   }

//   async createCategory(dto: CreateCategoryDto) {
//     return this.categoryRepo.save(dto);
//   }

//   async updateCategory(id: number, dto: UpdateCategoryDto) {
//     const category = await this.categoryRepo.findOne({ where: { id } });
//     if (!category) throw new NotFoundException();
//     return this.categoryRepo.save({ ...category, ...dto });
//   }

//   async deleteCategory(id: number) {
//     return this.categoryRepo.delete(id);
//   }

//   async findById(id: number) {
//     const category = await this.categoryRepo.findOne({ where: { id } });
//     if (!category) {
//       throw new NotFoundException(`Category with ID ${id} not found`);
//     }
//     return category;
//   }

// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({ where: { id } });
  }
   async getCategories() {
     return this.categoryRepo.find();
   }

   async createCategory(dto: CreateCategoryDto) {
     return this.categoryRepo.save(dto);
  }

   async updateCategory(id: number, dto: UpdateCategoryDto) {
     const category = await this.categoryRepo.findOne({ where: { id } });
   if (!category) throw new NotFoundException();
   return this.categoryRepo.save({ ...category, ...dto });
   }

  async deleteCategory(id: number) {
     return this.categoryRepo.delete(id);
   }

}
