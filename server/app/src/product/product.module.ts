import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from 'src/user/entities/producer.entity';
import { Staff } from 'src/user/entities/staff.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './entities/product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Producer, Staff])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
