import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenService } from './authen.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { Response } from 'express';
import { Request } from 'express';
import { LoginGuard } from '../common/guards/login.guard';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Get('signup')
  @Render('auth/signup')
  async showCreateForm() {
    return {}; // Retourner des données si nécessaire
  }
  //TODO: post Signup
  @Post('signup') //N-POINTE: auth/signup
  async signUp(@Body() signupData: SignupDto, @Res() res: Response) {
    this.authenService.signup(signupData);
    res.redirect('/authen/login');
  }

  @UseGuards(LoginGuard)
  @Get('login')
  @Render('auth/login')
  async showLoginForm() {
    return {}; // Retourner des données si nécessaire
  }

  @Post('login')
  async login(
    @Body() credentials: LoginDto,
    @Res() res: Response,
    @Req() req: Request & { session: { user: any } },
  ) {
    const info = await this.authenService.login(credentials);

    req.session.user = info.user_id;
    res.cookie('user', info.user_id);
    res.cookie('jwt', info.token.accessToken, { httpOnly: true });
    res.redirect('/home');
  }

  // TODO: Refresh Token Signup
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenService.refreshTokens(refreshTokenDto.refreshtoken);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('user');
    res.clearCookie('jwt');
    return res.redirect('login');
  }
}
