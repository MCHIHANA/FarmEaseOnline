import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { Product } from './product.entity';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Register the repository here
  ],
  controllers: [ProductsController, UploadController],
  providers: [ProductService],
  exports: [TypeOrmModule], // Export TypeOrmModule for use in other modules if needed
})
export class ProductsModule {}
