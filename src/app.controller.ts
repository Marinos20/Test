import {
  Controller,
  Get,
  Res,
  Render,
  UseGuards,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Request } from 'express';


import { AuthenticatedGuard } from './common/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  async index(@Req() req: Request) {
    const viewData = [];
    viewData['user'] = req.cookies.user;
    viewData['concert'] = await this.appService.findAllEvents();
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  @Render('/home')
  async search(@Body() body: any) {
    const viewData = [];
    viewData['concert'] = await this.appService.searchevent(body.search);
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('ticket/:id')
  @Render('tickets/ticket')
  async ticket(@Param('id') id: string) {
    const viewData = [];
    viewData['concert'] = await this.appService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/detail')
  @Render('tickets/ticket')
  deatil() {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('tickets/tickets')
  async home() {
    const viewData = [];
    viewData['concert'] = await this.appService.findAllEvents();
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/notifications')
  @Render('notifications')
  get_notifications(@Res() res: Response) {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/favorites')
  @Render('tickets/favorites')
  get_favorites(@Res() res: Response) {
    return;
  }
}
