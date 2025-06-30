// import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Category } from 'src/categories/categories.entity';
// import { Repository } from 'typeorm';
// import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
// import { Product } from './products.entity';
// import { CLOUDINARY} from 'src/uploads/cloudinary.provider';
// import { v2 as CloudinaryType } from 'cloudinary';

// @Injectable()
// export class ProductsService {
//   constructor(
//     @InjectRepository(Product)
//     private productRepo: Repository<Product>,
//     @Inject(CLOUDINARY) private cloudinary: typeof CloudinaryType
//   ){
//     console.log('ProductsService constructed');
//   }

//   async uploadImage(file: Express.Multer.File) {
//     const res = await this.cloudinary.uploader.upload(file.path, {
//       folder: 'GTEES-API/src/products'
//     });
//     return res;
//   }
//   async findOne(id: number) {
//     const product = await this.productRepo.findOne({
//       where: { id },
//       relations: ['category'],
//     });

//     if (!product) {
//       throw new NotFoundException(`Product with ID ${id} not found`);
//     }

//     return product;
//   }

//   async findAll() {
//     return this.productRepo.find({ relations: ['category'] });
//   }

//   async findBySlug(slug: string) {
//     return this.productRepo.findOne({ where: { slug }, relations: ['category'] });
//   }


//   async create(dto: CreateProductDto) {
//     const category = await this.productRepo.findOne({ where: { id: dto.categoryId } });
//     if (!category) throw new NotFoundException
//     return this.productRepo.save({ ...dto, category });
//   }

//   async update(id: number, dto: UpdateProductDto) {
//     const product = await this.productRepo.findOne({ where: { id } });
//     if (!product) throw new NotFoundException();
//     return this.productRepo.save({ ...product, ...dto });
//   }

//   async delete(id: number) {
//     return this.productRepo.delete(id);
//   }

// }
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Category } from 'src/categories/categories.entity';
import { cloudinary } from 'src/uploads/cloudinary.provider';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) { }

  findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['category'] });
  }

  async createWithImage(dto: CreateProductDto, file: Express.Multer.File) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
     if (!category) throw new NotFoundException('Category not found');

    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'GTEES-API/src/products',
    });

     const product = this.productRepo.create({
      ...dto,
      image: result.secure_url ,
      category,
    });

    return this.productRepo.save(product);
  }
    async findBySlug(slug: string) {
     return this.productRepo.findOne({ where: { slug }, relations: ['category'] });
   }


  async create(dto: CreateProductDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundException('Category not found');
    // Ensure image is a string
    const image = Array.isArray(dto.image) ? dto.image[0] : dto.image ?? '';
    return this.productRepo.save({ ...dto, image, category });
  }

   async update(id: number, dto: UpdateProductDto) {
     const product = await this.productRepo.findOne({ where: { id } });
     if (!product) throw new NotFoundException();
     // Ensure image is a string if present
     const updatedProduct = {
       ...product,
       ...dto,
       image: Array.isArray(dto.image) ? dto.image[0] : dto.image ?? product.image,
     };
     return this.productRepo.save(updatedProduct);
   }

   async delete(id: number) {
     return this.productRepo.delete(id);
   }



}
