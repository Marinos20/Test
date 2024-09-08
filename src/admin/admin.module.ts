import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { TicketModule } from 'src/tickets/ticket.module';

@Module({
  imports: [UserModule, TicketModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
