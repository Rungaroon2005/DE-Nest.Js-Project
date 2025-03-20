import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { UtilityService } from 'src/shared/utility/utility.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';
@Controller('product')
export class ProductController {
  chatModule: any;
  constructor(
    private readonly productService: ProductService,
    private readonly utilityService: UtilityService,
    private readonly globalHelperService: GlobalHelperService,
  ) {}

  @Get('/global')
  globalFunc(): string {
    return this.globalHelperService.globalFunc();
  }

  @Get('/shared')
  shareFunc(): string {
    return this.utilityService.shareFunc();
  }
  @Get()
  productFunc(): string {
    return this.productService.productFunc();
  }
  @Get('/productjson')
  getJSON() {
    return this.productService.getJSON();
  }
}
