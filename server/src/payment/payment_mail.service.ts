import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentMailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
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

  async orderMail(
    userEmail: string,
    userId: string,
    orderId: string,
    productIds: string[],
    total: number,
  ): Promise<void> {
    const products = await Promise.all(
      productIds.map((productId) => this.getProductDetails(productId)),
    );

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'kayyungx@gmail.com',
      to: userEmail,
      subject: 'Order Confirmation',
      html: `
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h2 {
            color: #333;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            margin-bottom: 10px;
          }
          strong {
            font-weight: bold;
          }
        </style>
        <h2>Order Confirmation</h2>
        <p>Thank you for your order. Here are the details:</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Products:</strong></p>
        <ul>
          ${products
            .map(
              (product) => `
              <li>
                <img src="${product.thumbnailSrc}" alt="Product Thumbnail" />
                <p><strong>Name:</strong> ${product.name}</p>
                <p><strong>Price:</strong> ${product.monthlyPrice}</p>
              </li>
            `,
            )
            .join('')}
        </ul>
        <h4><p>Total:</p> ${total}</h4>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async getProductDetails(
    productId: string,
  ): Promise<{ thumbnailSrc: string; name: string; monthlyPrice: string }> {
    const car = await this.prisma.car.findUnique({
      where: {
        id: productId,
      },
      select: {
        thumbnailSrc: true,
        name: true,
        monthlyPrice: true,
      },
    });

    const popularCar = await this.prisma.popularCar.findUnique({
      where: {
        id: productId,
      },
      select: {
        thumbnailSrc: true,
        name: true,
        monthlyPrice: true,
      },
    });

    return car ?? popularCar;
  }
}
