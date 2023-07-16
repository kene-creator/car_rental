import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';
import { User, UserRole } from '@prisma/client';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { Role } from './enums/roles.enums';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(
    dto: CreateUserDto,
  ): Promise<{ access_token: string; verification_token: string }> {
    try {
      //* generate the password hash
      const hash = await argon.hash(dto.password);

      const verificationToken = this.generateVerificationToken();

      const userRoles: UserRole[] = dto.roles.map(
        (role: Role) => role.toUpperCase() as UserRole,
      );

      //* create the user in th db
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailToken: verificationToken,
          roles: userRoles,
        },
      });

      //* return the user
      // Implement a function to generate a verification token
      await this.mailService.sendVerificationEmail(
        user.email,
        verificationToken,
      );

      const token = await this.signToken(user.id, user.email);

      delete user.hash;

      return {
        access_token: token.access_token,
        verification_token: verificationToken,
      };
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

  async signin(dto: AuthDto): Promise<{ access_token: string; user: User }> {
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

    const token = await this.signToken(user.id, user.email);

    delete user.hash;

    return { access_token: token.access_token, user };
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwtService.signAsync(payload, {
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
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          emailToken: token,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailvalid: true,
        },
      });

      return true; //* Verification successful
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //? Handle specific Prisma errors
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }

      // Handle other errors
      throw error;
    }
  }

  async verifyJwt(jwt: string): Promise<{ user: User; exp: number }> {
    if (!jwt) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(jwt, {
        secret: process.env.JWT_SECRET,
      });
      const { user, exp } = decoded;
      return { user, exp };
    } catch (error) {
      throw new UnauthorizedException('Invalid token for verify');
    }
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.generateVerificationToken();
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiresAt: resetTokenExpiration,
      },
    });

    await this.mailService.sendPasswordResetEmail(user.email, resetToken);
  }

  async updatePassword(token: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await argon.hash(newPassword);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hash: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }
}
