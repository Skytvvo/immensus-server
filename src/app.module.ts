import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { AddressesModule } from './addresses/addresses.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
    CartModule,
    AddressesModule,
    FiltersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
