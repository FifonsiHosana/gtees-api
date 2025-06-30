// import { ParseIntPipe, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { Controller } from '@nestjs/common';
// import { Body,Get,Param,UseGuards, Post,Put,Delete} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
// import { Roles } from 'src/common/guards/roles.guards';
// import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
// import { ProductsService } from './products.service';
// import { CloudinaryService } from 'src/uploads/cloudinary.service';

// @ApiBearerAuth()
// @ApiTags('Products')
// @Controller('products')
// export class ProductsController {
//     constructor(
//       private readonly productsService: ProductsService,
//       private readonly cloudinary: CloudinaryService
//       ) {}

//     @Get()
//     @ApiOperation({ summary: 'Get all products' })
//     @ApiResponse({ status: 200, description: 'List of all products' })
//     async findAll(){
//         return this.productsService.findAll();
//     }
//   //    @Get(':slug')
//   // async findOne(@Param('slug') slug: string) {
//   //   return this.productsService.findBySlug(slug);
//   // }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get product by ID' })
//   @ApiResponse({ status: 200, description: 'Product retrieved' })
//   async findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.productsService.findOne(id);
//   }

//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Post()
//   @ApiOperation({ summary: 'Create a new product' })
//   @ApiResponse({ status: 201, description: 'Product created successfully' })
//   create(@Body() dto: CreateProductDto) {
//     return this.productsService.create(dto);
//   }

//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Patch(':id')
//   @ApiOperation({ summary: 'Update product by ID' })
//   @ApiResponse({ status: 200, description: 'Product updated successfully' })
//   async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
//     return this.productsService.update(id, dto);
//   }

//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete product by ID' })
//   @ApiResponse({ status: 200, description: 'Product deleted successfully' })
//   delete(@Param('id') id: number) {
//     return this.productsService.delete(id);
//   }


//   @Post('upload-image')
//   @UseGuards(AuthGuard('jwt'))
//   @UseInterceptors(FileInterceptor('file'))
//   @ApiBearerAuth()
//   @ApiConsumes('multipart/form-data')
//   @ApiOperation({ summary: 'Upload product image to Cloudinary' })
//   @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
//   async uploadImage(@UploadedFile() file: Express.Multer.File) {
//     return this.cloudinary.uploadImage(file);
//   }

// }
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { cloudinary } from 'src/uploads/cloudinary.provider';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard } from 'src/common/guards/roles.guards';


@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })

  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }


  @Post('upload')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload product image to Cloudinary' })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.createWithImage(dto, file);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  create(@Body() dto: CreateProductDto, @Req() req) {
    console.log('Controller user:', req.user);
    return this.productsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }


}
