import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUser } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule, // ⬅️ Ensure ConfigModule is available here (optional since it's global)
    SequelizeModule.forFeature([AuthUser]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secretKey =
          configService.get<string>('JWT_SECRET_KEY') ||
          'p/PjbZCRpIWrYP/IgK18rHKUZ9ihMjwIyVzQji2gzeyYMG6N4nBh74ZW5aI9HJkK';
        console.log(
          'Loaded JWT_SECRET_KEY in AuthModule:',
          secretKey ? 'available' : 'using fallback',
        );
        return {
          secret: secretKey,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
