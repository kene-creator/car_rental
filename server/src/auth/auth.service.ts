import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
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
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}
