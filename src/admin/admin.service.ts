import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TicketService } from 'src/tickets/ticket.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}
  async findAll() {
    return this.userService.findAll();
  }
  async findAllEvents() {
    return this.ticketService.findAll();
  }

  async ticket_reservation() {
    return `This action returns a  admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
