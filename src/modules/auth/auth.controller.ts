import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from './dto/login.input';

@Controller('auth')
export class AuthControler {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() { username, password }: LoginInput) {
    return await this.authService.login(username, password);
  }
}
