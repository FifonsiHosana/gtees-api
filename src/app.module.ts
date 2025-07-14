import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
host: process.env.DATABASE_HOST || 'db',
port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
username: process.env.DATABASE_USER || 'postgres',
password: process.env.DATABASE_PASSWORD || 'donald05',
database: process.env.DATABASE_NAME || 'graphictees',

    autoLoadEntities: true,
    synchronize: true,
        ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  }), ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule,
    PaymentsModule,
    OrdersModule,
    CategoriesModule,
    AuthModule,
    ProductsModule,
    CartModule,
    FavoritesModule,
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule { }
