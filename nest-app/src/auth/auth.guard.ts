import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import config from '../common/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    const splittedHeader = authHeader ? authHeader.split(' ') : null;

    if (
      !(
        authHeader &&
        splittedHeader &&
        splittedHeader[0] === 'Bearer' &&
        splittedHeader[1]
      )
    ) {
      throw new UnauthorizedException();
    }

    const token = splittedHeader[1];

    const tokenPayload = await new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET_KEY, (err, payload) => {
        if (err) reject(err);

        resolve(payload);
      });
    }).catch((e) => {
      throw new UnauthorizedException(e.message);
    });

    console.warn(
      `FOR CROSSCHECK! Token payload: ${JSON.stringify(tokenPayload)}`,
    );

    return true;
  }
}
