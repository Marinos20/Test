import {
  IsString,
  // IsNotEmpty,
  // MinLength,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateTicketDto {
  @IsString()
  user_id: string;

  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsString()
  group: string;

  @IsString()
  image_url: string;

  @IsString()
  price: string;

  @IsString()
  date: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
