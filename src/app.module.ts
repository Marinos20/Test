import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TicketModule } from './tickets/ticket.module';
// import { AuthModule } from './auth/auth.module';
import { TestController } from './test/test.controller';
import { PdfModule } from './pdf/pdf.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from './admin/admin.module';
import { AuthenModule } from './authen/authen.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://anicetpotter:rWo7IMq0pzegZIE3@cluster0.iwnz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    JwtModule.register({ global: true, secret: '123' }),
    UserModule,
    ReservationsModule,
    TicketModule,
    // AuthModule,
    PdfModule,
    NotificationModule,
    AdminModule,
    AuthenModule,
    AuthenModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
