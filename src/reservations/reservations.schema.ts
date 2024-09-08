import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';
import { Ticket } from 'src/tickets/ticket.schema';

@Schema()
export class Reservation extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket_id: Ticket;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: false })
  created_at: Date;

  @Prop({ required: false })
  updated_at: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
