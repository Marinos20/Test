import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  BadRequestException,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { RolesGuard } from '../common/guards/roles.guard';
import { Request } from 'express';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() body: any, @Res() res: Response) {
    // Convert body to CreateUserDto
    const createUserDto = new CreateUserDto();
    createUserDto.name = body.name;
    createUserDto.email = body.email;
    createUserDto.password = body.password;
    createUserDto.role = body.role;

    try {
      await this.userService.create(createUserDto);
      res.redirect('/users/admin');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(RolesGuard)
  @Get('/admin')
  @Render('admin/users/allusers')
  async findAll() {
    const viewData = [];
    viewData['title'] = 'All users';
    viewData['users'] = await this.userService.findAll();
    return {
      viewData: viewData,
    };
  }

  @UseGuards(RolesGuard)
  @Get('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    this.userService.delete(id);
    res.redirect('/users/admin');
  }

  @UseGuards(RolesGuard)
  @Get('edit/:id')
  @Render('admin/users/edit')
  async findOne(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'edit users';
    viewData['user'] = await this.userService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  @Render('userprofile')
  async findprofile(@Req() req: Request) {
    const viewData = [];
    viewData['user'] = await this.userService.findOne(req.cookies.user._id);
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('profile')
  async editprofile(
    @Body() body: any,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.name = body.name;
    updateUserDto.email = body.email;
    updateUserDto.password = body.password;
    updateUserDto.role = body.role; // Convert checkbox value to boolean
    this.userService.update(req.cookies.user._id, updateUserDto);
    res.redirect('/users/profile');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile/delete')
  async deletprofile(@Res() res: Response, @Req() req: Request) {
    this.userService.delete(req.cookies.user._id);
    res.redirect('/auth/login');
  }

  @UseGuards(RolesGuard)
  @Post('edit/:id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.name = body.name;
    updateUserDto.email = body.email;
    updateUserDto.password = body.password;
    updateUserDto.role = body.role; // Convert checkbox value to boolean
    this.userService.update(id, updateUserDto);
    res.redirect('/users/admin');
  }
}
