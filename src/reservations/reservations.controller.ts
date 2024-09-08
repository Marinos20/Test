import {
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Response } from 'express';
import { Request } from 'express';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('payment/:id')
  @Render('reservations/reservations')
  async index(@Param('id') id: string) {
    const viewData = [];
    viewData['concert'] = await this.reservationsService.findOne(id);
    return {
      viewData: viewData,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('reservation/:id')
  async create(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const createReservationDto = new CreateReservationDto();
    createReservationDto.user_id = req.cookies.user._id;
    createReservationDto.ticket_id = id;
    createReservationDto.date = new Date();
    this.reservationsService.create(createReservationDto);
    res.redirect('/home');
  }
}
