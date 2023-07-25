import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Delete } from '@nestjs/common';
import { Account } from 'src/account/entities/account.entity';
import { GetAccount } from 'src/account/get-account.decorator';
import { JwtAuthGuard } from 'src/account/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { TProduct } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@GetAccount() account: Account) {
    return this.productService.getProducts(account);
  }

  @Get('/:productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() createProductDto: CreateProductDto, @GetAccount() account: Account) {
    return this.productService.createProduct(createProductDto, account);
  }

  @Delete('/:productId')
  async cancelProduct(@GetAccount() account: Account, @Param('productId') productId: string): Promise<TProduct> {
    return this.productService.cancelProduct(account, productId);
  }
}
