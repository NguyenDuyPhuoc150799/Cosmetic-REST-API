// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { AuthControler } from './auth.controller';
import { JwtStrategy } from './../../strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    }),
  ],
  controllers: [AuthControler],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
