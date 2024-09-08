import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: false })
  status: boolean;

  @Prop({ required: true })
  created_at: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
