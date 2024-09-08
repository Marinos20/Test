import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TicketModule } from 'src/tickets/ticket.module';
import { Reservation, ReservationSchema } from './reservations.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TicketModule,
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
