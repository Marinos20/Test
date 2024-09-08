import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { TicketService } from 'src/tickets/ticket.service';
import { Reservation } from './reservations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly ticketService: TicketService,
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  async findOne(id: string) {
    return this.ticketService.findOne(id);
  }

  async user_concert(id: string) {
    const usertbl = await this.reservationModel.find({ user_id: id }).exec();
    return usertbl;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
