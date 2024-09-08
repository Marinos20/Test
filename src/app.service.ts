import { Injectable } from '@nestjs/common';
import { TicketService } from './tickets/ticket.service';

@Injectable()
export class AppService {
  constructor(private readonly ticketService: TicketService) {}

  async findAllEvents() {
    return this.ticketService.findAll();
  }

  async findOne(id: string) {
    return this.ticketService.findOne(id);
  }

  async searchevent(search: string){
    return this.ticketService.search(search);
  }
}
