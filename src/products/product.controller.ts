import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  // Fetch all products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Fetch a single product by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // Create a new product
  @Post()
  create(@Body() product: Product) {
    return this.productsService.create(product);
  }

  // Update a product by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.update(+id, product);
  }

  // Delete a product by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  // Image upload endpoint
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Folder where images will be saved
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File upload failed.');
    }
    // Return the URL of the uploaded image
    return {
      imageUrl: `https://mlimiaguleonline.onrender.com/uploads/${file.filename}`,
    };
  }
}
