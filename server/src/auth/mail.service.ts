import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // Initialize the transporter with Mailtrap SMTP settings
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: this.configService.get('MAILTRAP_USERNAME'),
        pass: this.configService.get('MAILTRAP_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationToken: string,
  ): Promise<void> {
    const verificationLink = `http://localhost:3002/verify/${verificationToken}`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'kayyungx@gmail.com',
      to,
      subject: 'Account Verification',
      html: `
        <p>Thank you for registering. Please click the following link to verify your account:</p>
        <a href="${verificationLink}">Verify Account</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
