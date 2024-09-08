import { Controller, Get, Render } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('/userprofile')
  @Render('userprofile')
  getUserProfile() {
    return {
      user: { name: 'Stella' },
    };
  }

  @Get('/ticket')
  @Render('tickets/ticket')
  getTicket(): { user: { name: string } } {
    return {
      user: { name: 'Stella' },
    };
  }
}
