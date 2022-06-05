import { ProductModule } from './modules/product/product.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc@ABC1',
      database: 'cosmeticDB',
      entities: ['dist/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
