// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Render,
//   BadRequestException,
//   UseGuards,
//   Res,
//   Req,
//   Session,
// } from '@nestjs/common';
// import { AuthService } from './auth.service';
// // import { LoginDto } from './dto/login.dto';
// import { CreateAuthDto } from './dto/create-auth.dto';

// import { LocalAuthGuard } from '../common/guards/local-auth.guard';
// import { Response, Request } from 'express';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) { }

//   @Get('signup')
//   @Render('auth/signup')
//   async showCreateForm() {
//     return {}; // Retourner des données si nécessaire
//   }
//   @Post('create')
//   async create(@Body() body: any) {
//     const createAuthDto = new CreateAuthDto();
//     createAuthDto.name = body.name;
//     createAuthDto.email = body.email;
//     createAuthDto.password = body.password;
//     createAuthDto.role = 'false';
//     try {
//       return await this.authService.create(createAuthDto);
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   @Get('login')
//   @Render('auth/login')
//   async showLoginForm() {
//     return {}; // Retourner des données si nécessaire
//   }

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async loginUser(@Req() req: Request, @Res() res: Response) {
//     const { email, password } = req.body;
//     const user = await this.authService.validateUser(email, password);

//     if (user) {
//       req.login(user, (err) => {
//         if (err) {
//           req.flash('loginError', 'Login failed');
//           return res.redirect('/auth/login');
//         }
//         return res.redirect('/profile'); // Redirection après connexion
//       });
//     } else {
//       req.flash('loginError', 'Invalid credentials');
//       return res.redirect('/auth/login');
//     }
//   }
//   // async login(
//   //   @Req() req: Request,
//   //   @Res() res: Response,
//   //   @Body() loginDto: LoginDto,
//   // ) {
//   //   const user = await this.authService.validateUser(
//   //     loginDto.email,
//   //     loginDto.password,
//   //   );
//   //   if (!user) {
//   //     throw new BadRequestException('Invalid credentials');
//   //   }

//   //   req.login(user, (err) => {
//   //     if (err) {
//   //       throw new BadRequestException('Login failed');
//   //     }
//   //     return res.redirect('/'); // Redirection après connexion
//   //   });
//   //}
//   @Get('profile')
//   async getProfile(@Req() req: Request, @Res() res: Response) {
//     if (!req.isAuthenticated()) {
//       return res.redirect('/auth/login');
//     }
//     res.render('profile', { user: req.user }); // Assurez-vous d'avoir une vue 'profile.hbs'
//   }

//   @Get('logout')
//   async logout(@Req() req: Request, @Res() res: Response) {
//     req.logout((err) => {
//       if (err) {
//         // Gérer les erreurs de déconnexion si nécessaire
//         return res.status(500).send('Logout failed');
//       }
//       res.redirect('/login');
//     });
//   }

//   @Get('status')
//   getStatus(@Session() session: Record<string, any>) {
//     return { isAuthenticated: !!session.passport?.user };
//   }
// }
