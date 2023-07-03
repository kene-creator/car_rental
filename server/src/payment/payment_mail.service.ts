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
        background-color: #f2f2f2;
        padding: 20px;
        margin: 0;
      }
    
      h2 {
        color: #0099cc;
        margin-bottom: 10px;
      }
    
      p {
        color: #333;
        margin-bottom: 5px;
      }
    
      strong {
        font-weight: bold;
      }
    
      ul {
        list-style: none;
        padding: 0;
      }
    
      li {
        margin-bottom: 10px;
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
      }
    
      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 5px;
      }
    
      h4 {
        margin-top: 20px;
        color: #333;
      }
    
      .footer {
        margin-top: 40px;
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
      }
    
      .contact-details {
        color: #555;
        margin-bottom: 10px;
      }
    
      .social-media-icons {
        margin-top: 20px;
      }
    
      .social-media-icons a {
        display: inline-block;
        margin-right: 10px;
      }
    
      .email-icon {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 20px;
      }
    
      .email-icon img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    </style>
    
    <div style="max-width: 600px; margin: 0 auto;">
      <div class="email-icon">
        <img src="https://www.sendx.io/hubfs/Email-Messages-for-Order-Confirmation-Page-v3.png" alt="Email Icon" />
        <p>example@example.com</p>
      </div>
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
      <h4>Total: ${total}</h4>
      <div class="footer">
        <p class="contact-details">
          Contact us: <strong>Lorem Ipsum</strong> | 123 Main Street, Lorem City |
          Phone: 123-456-7890
        </p>
        <div class="social-media-icons">
          <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="Facebook Icon" /></a>
          <a href="#"><img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png" alt="Twitter Icon" /></a>
          <a href="#"><img src="https://static.vecteezy.com/system/resources/thumbnails/017/743/717/small_2x/instagram-icon-logo-free-png.png" alt="Instagram Icon" /></a>
        </div>
      </div>
    </div>
    
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
