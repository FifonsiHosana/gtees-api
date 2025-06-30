// import { Body, Controller, Get, Post, UseGuards, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { Roles } from 'src/common/guards/roles.guards';
// import { CreateCategoryDto } from './create-category.dto';
// import { UpdateCategoryDto } from './update-category.dto';
// import { CategoriesService } from './categories.service';


// @ApiBearerAuth()
// @ApiTags('Categories')
// @Controller('categories')
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) { }
//   @Get()
//   @ApiOperation({ summary: 'Get all categories' })
//   @ApiResponse({ status: 200, description: 'List of all categories' })
//   findAll() {
//     return this.categoriesService.getCategories();
//   }
//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Post()
//   @ApiOperation({ summary: 'Create a new category' })
//   @ApiResponse({ status: 201, description: 'Category created successfully' })
//   create(@Body() dto: CreateCategoryDto) {
//     return this.categoriesService.createCategory(dto);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get category by ID' })
//   @ApiResponse({ status: 200, description: 'Category retrieved' })
//   async findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.categoriesService.findById(id);
//   }

//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Put(':id')
//   @ApiOperation({ summary: 'Update category by ID' })
//   @ApiResponse({ status: 200, description: 'Category updated successfully' })
//   update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
//     return this.categoriesService.updateCategory(id, dto);
//   }

//   @UseGuards(AuthGuard('jwt'), Roles('admin'))
//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete category by ID' })
//   @ApiResponse({ status: 200, description: 'Category deleted successfully' })
//   delete(@Param('id') id: number) {
//     return this.categoriesService.deleteCategory(id);
//   }
// }
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/common/guards/roles.guards';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';
@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of all categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  delete(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }

}
