// import { Module } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Category } from 'src/categories/categories.entity';
// import { Product } from './products.entity';
// import { ProductImage } from './productimage.entity';
// import { Variant } from './variant.entity';
// import { CloudinaryProvider } from 'src/uploads/cloudinary.provider';
// import { CloudinaryService } from 'src/uploads/cloudinary.service';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Product, ProductImage,Variant,Category]), 
//   ],
//   providers: [ProductsService, CloudinaryService, CloudinaryProvider],
//   controllers: [ProductsController],
//   exports: [ProductsService,TypeOrmModule],
// })
// export class ProductsModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Category } from 'src/categories/categories.entity';
import { UploadModule } from 'src/uploads/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]),UploadModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
