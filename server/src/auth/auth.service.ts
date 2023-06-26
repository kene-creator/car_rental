import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailService,
  ) {}

  async signup(dto: AuthDto): Promise<{ access_token: string }> {
    try {
      //* generate the password hash
      const hash = await argon.hash(dto.password);

      const verificationToken = this.generateVerificationToken();

      //* create the user in th db
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          email: dto.email,
          hash,
          emailToken: verificationToken,
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
      // Implement a function to generate a verification token
      await this.mailService.sendVerificationEmail(
        user.email,
        verificationToken,
      );

      return this.signToken(user.id, user.email);
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

  async signin(dto: AuthDto): Promise<{ access_token: string }> {
    //find the user in the db
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if no user throw an error
    if (!user) {
      throw new ForbiddenException('Email or password is wrong');
    }

    //compare the password
    const isPasswordCorrect = await argon.verify(user.hash, dto.password);

    //if the password is wrong throw an error
    if (!isPasswordCorrect) {
      throw new ForbiddenException('Email or password is wrong');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      secret: process.env.JWT_SECRET,
    });

    return {
      access_token: token,
    };
  }

  generateVerificationToken(): string {
    const tokenLength = 32; // Specify the desired length of the token

    // Generate a random string of bytes
    const randomBytesBuffer = randomBytes(tokenLength);

    // Convert the random bytes to a hexadecimal string
    const token = randomBytesBuffer.toString('hex');

    return token;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const verifyEmail = await this.prisma.user.findUnique({
      where: {
        emailToken: token,
      },
    });
  }
}
