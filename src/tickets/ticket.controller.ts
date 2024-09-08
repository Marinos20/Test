import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Res,
  Req,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('create')
  @Render('admin/tickets/index')
  async showCreateForm() {
    return {};
  }

  @Get('admin')
  @Render('admin/tickets/show')
  async findForm() {
    const viewData = [];
    viewData['title'] = 'All tickets';
    viewData['tickets'] = await this.ticketService.findAll();
    return {
      viewData: viewData,
    };
  }

  @Get('edit/:id')
  @Render('admin/tickets/edit')
  async editForm(@Param('id') id: string) {
    const viewData = [];
    viewData['title'] = 'Edit ticket';
    viewData['ticket'] = await this.ticketService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('image_url', 20, {
      storage: diskStorage({
        destination: './public/images/',
        filename(req: any, file: any, callback: any) {
          callback(null, file.originalname);
        },
      }),
      //   fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() body: any,
    @Res() res: Response,
    @UploadedFiles() files: Express.Multer.File,
    @Req() req: Request,
  ) {
    // Convert body to CreateTicketDto
    const createTicketDto = new CreateTicketDto();
    createTicketDto.user_id = req.cookies.user._id;
    createTicketDto.title = body.title;
    createTicketDto.genre = body.genre;
    createTicketDto.location = body.location;
    createTicketDto.group = body.group;
    createTicketDto.price = body.price;
    createTicketDto.description = body.description;
    createTicketDto.date = body.date;
    if (files) {
      createTicketDto.image_url = files[0].filename;
    }

    try {
      this.ticketService.create(createTicketDto);
      res.redirect('/tickets/admin');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Post('update/:id')
  @UseInterceptors(
    FilesInterceptor('image_url', 20, {
      storage: diskStorage({
        destination: './public/images/',
        filename(req: any, file: any, callback: any) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File,
    @Res() res: Response,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    if (files == null) {
      updateTicketDto.image_url = files[0].filename;
    }
    this.ticketService.update(id, updateTicketDto);
    res.redirect('/tickets/admin');
  }

  @Get('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    this.ticketService.delete(id);
    res.redirect('/tickets/admin');
  }
}
