import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, id: string) => void): void {
    done(null, user._id.toString());
  }
  async deserializeUser(
    id: string,
    done: (err: Error, user: any) => void,
  ): Promise<void> {
    try {
      const user = await this.userService.findOne(id); // Récupérer l'utilisateur à partir de l'ID
      done(null, user); // Désérialiser l'utilisateur
    } catch (error) {
      done(error, null); // Gérer les erreurs
    }
  }
}
