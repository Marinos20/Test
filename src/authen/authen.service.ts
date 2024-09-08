import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

@Injectable()
export class AuthenService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtservice: JwtService,
  ) {}
  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;
    //TODO : Check if email is in use
    const emailInuse = await this.UserModel.findOne({
      email,
    });
    if (emailInuse) {
      throw new BadRequestException('Email already in user');
    }
    //TODO : Hash password
    const hashedPassword = await bcrypt.hash(password, 10); //123
    //TODO : Create user and save in mongodb

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }
  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    //find if user by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('wrong credentials');
    }
    //TODO: Compare entred password with existing passsword
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('wrong credentials');
    }
    // TODO: Generate JWT token
    const tokens = await this.generateUserTokens(user._id);
    return {
      token: tokens,
      user_id: user,
    };
  }
  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });
    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }

    return this.generateUserTokens(token.userId);
  }
  async generateUserTokens(userId) {
    const accessToken = this.jwtservice.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }
  async storeRefreshToken(token: string, userId) {
    // calculate expiry date 3 days from nom
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.RefreshTokenModel.create({ token, userId, expiryDate });
  }
}
