import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/entities/auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './book/book.module';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Makes ConfigService available app-wide
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [Book, AuthUser],
        autoLoadModels: true,
        sync: { alter: true },
      }),
    }),
    AuthModule,
    BooksModule,
  ],
  providers: [BooksModule],
})
export class AppModule {}
