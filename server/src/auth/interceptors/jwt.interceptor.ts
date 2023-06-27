import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);

      // Check if token is expired
      if (Date.now() >= decoded.exp * 1000) {
        throw new UnauthorizedException('Token has expired');
      }

      // Attach user to request object
      request.user = decoded;

      return next.handle();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
