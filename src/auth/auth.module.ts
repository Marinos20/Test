// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Auth, AuthSchema } from './auth.schema';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from '../user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './local.strategy';
// import { SessionSerializer } from './session.serializer';
// import { AuthController } from './auth.controller'; // Assurez-vous que ce contrôleur existe

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
//     UserModule, // Utilisation du UserService à partir du UserModule
//     PassportModule, // Import de PassportModule pour l'authentification
//   ],
//   controllers: [AuthController], // Assurez-vous que AuthController est bien défini
//   providers: [AuthService, LocalStrategy, SessionSerializer],
//   exports: [AuthService], // Exporter AuthService pour être utilisé ailleurs
// })
// export class AuthModule {}
