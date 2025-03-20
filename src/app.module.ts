import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/entities/auth.entity';
import { Customer } from './customer/entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksService } from './Books/books.service';
import { BooksModule } from './Books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes ConfigService available app-wide
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [Customer, AuthUser],
        autoLoadModels: true,
        sync: { alter: true },
      }),
    }),
    AuthModule,
    BooksModule,
  ],
  providers: [BooksService],
})
export class AppModule {}
