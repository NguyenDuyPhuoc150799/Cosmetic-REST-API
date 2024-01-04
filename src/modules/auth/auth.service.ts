import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IPayload } from '../../interface/payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    //   const payload;
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      const payload: IPayload = {
        id: user.id,
        username: username,
        name: user.name,
        avatar: user.avatar,
        role: user.userType,
      };
      return {
        access_token: this.jwtService.sign(payload),
        userInfo: payload,
      };
    }
    throw new UnauthorizedException('Username or Password incorrect!');
  }
}
