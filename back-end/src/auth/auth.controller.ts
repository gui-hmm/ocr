import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.authService.register(email, password);
  }
}
