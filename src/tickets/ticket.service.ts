import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  // async find(id: string): Promise<Ticket[]> {
  //   return await this.ticketModel.find({ where: { user_id: id } }).exec();
  // }

  async findAll(): Promise<Ticket[]> {
    const dates_arr = await this.ticketModel.find().exec();

    const data_tab = dates_arr.map((element) => {
      const date = new Date(element['date']);
      const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      element['dateformat'] =
        weekday[date.getDay()] +
        ', ' +
        date.getDate() +
        ', ' +
        date.toLocaleString('default', { month: 'long' }) +
        ', ' +
        date.getFullYear();
      return element;
    });
    return data_tab;
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException(`ticket with ID ${id} not found`);
    }
    return ticket;
  }
  async search(search: string){
    const ticket = await this.ticketModel.find().exec();
    return search;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(id, updateTicketDto, { new: true })
      .exec();
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return updatedTicket;
  }

  async delete(id: string): Promise<Ticket> {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(id).exec();
    if (!deletedTicket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return deletedTicket;
  }
}
