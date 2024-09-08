import {
  Controller,
  Get,
  Param,
  Delete,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @Render('admin/dashboard')
  async findAll() {
    const viewData = [];
    const data_user = await this.adminService.findAll();
    const data_events = await this.adminService.findAllEvents();
    viewData['total_user'] = data_user.length;
    viewData['total_events'] = data_events.length;
    return {
      viewData: viewData,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return id;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
