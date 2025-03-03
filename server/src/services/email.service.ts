// src/services/email.service.ts
// src/services/email.service.ts
import * as nodemailer from 'nodemailer';
import { emailConfig } from '../config/mailer.config';
import { orderConfirmationTemplate,  expirationReminderTemplate, welcomeEmailTemplate, promotionEmailTemplate, upcomingSessionTemplate} from '../utils/email.templates';
import { QRCodeDTO } from '../dto/order.dto';
import * as fs from 'fs'; // Thư viện fs để làm việc với tệp
import * as path from 'path'; // Thư viện path để làm việc với đường dẫn

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(emailConfig);
    }


    async sendOrderConfirmation(order: any, userEmail: string, qrCodes: QRCodeDTO[]): Promise<void> {
        try {
            const isClassOrder = order.orderDetails.some((detail: any) => detail.trainerClass); // Kiểm tra có phải order class không
    
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: userEmail,
                subject: isClassOrder ? 'Xác nhận đặt lớp học thành công' : 'Xác nhận đặt lịch tập gym thành công',
                html: orderConfirmationTemplate(order, qrCodes, isClassOrder), // Truyền thêm tham số `isClassOrder`
                attachments: await Promise.all(
                    qrCodes.map(async (qrCode, index) => {
                        const fileName = `qrcode_${qrCode.orderId}_${index}.png`;
                        const filePath = path.join(__dirname, 'temp', fileName);
    
                        await fs.promises.writeFile(filePath, qrCode.qrCode.split(',')[1], { encoding: 'base64' });
    
                        return { filename: fileName, path: filePath };
                    })
                ),
            };
    
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
    
            // Xóa tệp tạm sau khi gửi email
            await Promise.all(mailOptions.attachments.map(attachment => fs.promises.unlink(attachment.path)));
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send confirmation email');
        }
    }
    
    


    // Phương thức gửi email chào mừng
    async sendWelcomeEmail(userName: string, userEmail: string, discountCode: string): Promise<void> {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Chào mừng bạn đến với chúng tôi!',
            html: welcomeEmailTemplate(userName, discountCode),
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Welcome email sent successfully');
        } catch (error) {
            console.error('Error sending welcome email:', error);
            throw new Error('Failed to send welcome email');
        }
    }

    // Phương thức gửi email mã giảm giá đặc biệt
    async sendPromotionEmail(userEmail: string, promotionCode: string): Promise<void> {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Mã giảm giá đặc biệt dành cho bạn!',
            html: promotionEmailTemplate(promotionCode),
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Promotion email sent successfully');
        } catch (error) {
            console.error('Error sending promotion email:', error);
            throw new Error('Failed to send promotion email');
        }
    }


    async sendReminderEmail(userEmail: string, userName: string) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Thông báo gia hạn',
            html:  expirationReminderTemplate(userName),
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }

    async sendUpcomingSessionReminder(userEmail: string, userName: string, sessionDateTime: Date) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Thông báo lịch tập sắp tới',
            html: upcomingSessionTemplate(userName, sessionDateTime),
        };
    
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email đã được gửi thành công tới ${userEmail}`);
        } catch (error) {
            console.error(`Gửi email thất bại tới ${userEmail}:`, error);
        }
    }
    
    
}
