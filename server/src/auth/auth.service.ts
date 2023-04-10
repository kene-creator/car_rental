import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      //* generate the password hash
      const hash = await argon2.hash(dto.password);

      //* create the user in th db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          hash: false,
        },
      });

      //* return the user
      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          //* handle the error
          throw new ForbiddenException('Email already exists');
        }
      }
      throw err;
    }
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}
