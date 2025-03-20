/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto'; // Ensure DTO is defined
import { hash, genSalt, compare } from 'bcrypt';
import { AuthUser } from './entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser)
    private readonly authUserModel: typeof AuthUser,
    private jwtService: JwtService,
  ) {}

  //

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Validate required fields
    if (!username || !email) {
      throw new BadRequestException('Username and email are required.');
    }

    // Check if the email already exists
    const authuser = await this.authUserModel.findOne({
      where: { email },
    });

    if (authuser) {
      throw new BadRequestException(
        'This email already exists. Please try again.',
      );
    }

    // Encrypt password (hash)
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    // Insert new user into table
    const newUser = await this.authUserModel.create({
      username,
      email,
      password: hashPassword,
    });

    return newUser;
  }

  async login(logindto: LoginDto) {
    const authuser = await this.authUserModel.findOne({
      where: { email: logindto.email },
    });

    if (!authuser) {
      throw new UnauthorizedException(
        'This email does not exist. Please try again.',
      );
    }

    const isValid = await compare(logindto.password, authuser.password);
    if (!isValid) {
      throw new UnauthorizedException('Incorrect password. Please try again.');
    }

    const payload = { user_id: authuser.id, email: authuser.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY, // Ensure correct spelling
    });

    return { access_token: token }; // Matches the image format
  }
  async getUserProfile(id: number) {
    return await this.authUserModel.findByPk(id, {
      attributes: ['id', 'username', 'email'],
    });
  }
  async remove(id: number): Promise<number> {
    // Find the user first to verify it exists
    const user = await this.authUserModel.findByPk(id);

    if (!user) {
      return 0; // No rows affected
    }

    // Delete the user
    await user.destroy();

    // Return 1 to indicate one row was affected
    return 1;
  }
}
