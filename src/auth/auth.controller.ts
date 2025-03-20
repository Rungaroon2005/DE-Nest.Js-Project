/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/auth') // localhost:3000/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/regist') // localhost:3000/auth/regist
  @HttpCode(201) // show code 201, when register complete
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      message: 'Register Complete',
    };
  }

  @Post('/login') // localhost:3000/auth/login
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      const userId = req.user.user_id;
      const profile = await this.authService.getUserProfile(userId);

      if (!profile) {
        throw new NotFoundException('User profile not found');
      }

      return profile;
    } catch (error) {
      console.error('Profile retrieval error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving user profile');
    }
  }

  @UseGuards(JwtAuthGuard) // check token
  @Delete('/delete/:id') // localhost:3000/auth/delete/:id
  async remove(@Param('id') id: string) {
    const destroyCustomer = await this.authService.remove(+id);
    console.log(destroyCustomer);
    if (destroyCustomer == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
