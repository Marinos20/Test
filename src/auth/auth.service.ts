import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async create(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async findAll() {
    return this.userService.findAll();
  }

  async findOne(id: string) {
    return this.userService.findOne(id);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email); // Ensure findByEmail exists in UserService
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject(); // Exclude password from the result
      return result;
    }
    return null;
  }
}
