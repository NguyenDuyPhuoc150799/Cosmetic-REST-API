import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return user;
    }

    if (!roles.some((item) => item === user.role)) {
      throw err || new ForbiddenException();
    }

    return user;
  }
}
