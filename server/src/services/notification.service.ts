import * as cron from 'node-cron';
import { Order } from '../entities/order.entity';
import { EmailService } from './email.service';
import { Repository, Between } from 'typeorm';
import { OrderDetail } from '../entities/order_detail.entity';
import { AppDataSource } from '../database/db';
import { NotificationConfig } from '../entities/notification_config.entity'; // Import bảng cấu hình

export class NotificationService {
    private emailService: EmailService;
    private orderRepository: Repository<Order>;
    private orderDetailRepository: Repository<OrderDetail>;
    private notificationConfigRepository: Repository<NotificationConfig>;

    constructor(
        orderRepository: Repository<Order> = AppDataSource.getRepository(Order),
        orderDetailRepository: Repository<OrderDetail> = AppDataSource.getRepository(OrderDetail),
        notificationConfigRepository: Repository<NotificationConfig> = AppDataSource.getRepository(NotificationConfig)
    ) {
        this.emailService = new EmailService();
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.notificationConfigRepository = notificationConfigRepository;
        this.initCronJob();
    }

    private initCronJob() {
        // Cron job gửi thông báo gia hạn
        cron.schedule('0 * * * *', async () => { // Chạy lúc 8h sáng mỗi ngày
            console.log('Cron job gửi thông báo gia hạn đang chạy');
            await this.checkAndNotifyUsers(); // Thông báo gia hạn
        });
    
        // Cron job gửi thông báo nhắc nhở lịch tập
        cron.schedule('0 * * * *', async () => { // Chạy mỗi giờ
            console.log('Cron job gửi thông báo nhắc nhở lịch tập đang chạy');
            await this.remindTrainingSchedules(); // Nhắc nhở lịch tập
        });
    }
    
    // Hàm cập nhật giá trị cấu hình
    // Cập nhật cấu hình thông báo
    async updateNotificationConfig(
        type: string, 
        value: number
    ): Promise<NotificationConfig> {
        // Tìm cấu hình hiện tại
        const existingConfig = await this.notificationConfigRepository.findOne({ 
            where: { type } 
        });

        if (!existingConfig) {
            throw new Error(`Không tìm thấy cấu hình với loại ${type}`);
        }

        // Cập nhật giá trị
        existingConfig.value = value;

        // Lưu và trả về cấu hình đã cập nhật
        return await this.notificationConfigRepository.save(existingConfig);
    }

        // Lấy cấu hình hiện tại
        async getNotificationConfig(type: string): Promise<NotificationConfig> {
            const config = await this.notificationConfigRepository.findOne({ 
                where: { type } 
            });
    
            if (!config) {
                throw new Error(`Không tìm thấy cấu hình với loại ${type}`);
            }
    
            return config;
        }

    

        private async checkAndNotifyUsers() {
            const orders = await this.orderRepository.find({
                relations: ['user', 'orderDetails']
            });
            const remainingSessionsConfig = await this.notificationConfigRepository.findOne({
                where: { type: 'remaining_sessions' }
            });
            if (!remainingSessionsConfig) {
                console.error('Cấu hình thông báo không tồn tại!');
                return;
            }
            const remainingSessionsThreshold = remainingSessionsConfig.value;  // Số buổi còn lại để gửi thông báo
    
            for (const order of orders) {
                const remainingSessions = await this.countRemainingSessions(order.user.id);
    
                // Kiểm tra nếu còn ít hơn hoặc bằng số buổi cấu hình và gửi thông báo gia hạn
                if (remainingSessions <= remainingSessionsThreshold) {
                    await this.emailService.sendReminderEmail(order.user.email, order.user.username);
                }
    
            }
        }

    private async countRemainingSessions(orderId: number): Promise<number> {
        const remainingDetails = await this.orderDetailRepository.count({
            where: { order: { id: orderId }, status: 'pending' }
        });
        return remainingDetails;
    }

    private async remindTrainingSchedules() {
        // Lấy cấu hình before_session_time
        const beforeSessionConfig = await this.notificationConfigRepository.findOne({
            where: { type: 'before_session_time' },
        });
        if (!beforeSessionConfig) {
            console.error('Cấu hình before_session_time không tồn tại!');
            return;
        }
        const reminderTime = beforeSessionConfig.value; // Giá trị cấu hình (giờ trước buổi tập)
    
        // Lấy thời gian hiện tại
        const currentTime = new Date();
        const notifyStartTime = new Date(currentTime.getTime()); // Thời gian bắt đầu thông báo
        const notifyEndTime = new Date(currentTime.getTime() + reminderTime * 60 * 60 * 1000); // Thời gian kết thúc thông báo
        const currentDate = new Date(currentTime.toDateString()); // Chỉ lấy ngày hiện tại
    
        // Tìm buổi tập sắp diễn ra trong khoảng thời gian này
        const upcomingSessions = await this.orderDetailRepository.find({
            relations: ['order', 'order.user'], // Lấy thông tin user
            where: {
                status: 'pending', // Chỉ lấy lịch trạng thái pending
                sessionDate: currentDate, // Chỉ lấy các buổi tập trong ngày hiện tại
                sessionTime: Between(
                    notifyStartTime.toTimeString().split(' ')[0], // Giờ bắt đầu
                    notifyEndTime.toTimeString().split(' ')[0] // Giờ kết thúc
                ),
            },
        });
    
        // Gửi thông báo đến người dùng
        for (const session of upcomingSessions) {
            const { email, username } = session.order.user;
            const sessionDateTime = new Date(`${session.sessionDate}T${session.sessionTime}`);
            console.log(`Gửi thông báo nhắc nhở đến ${email} (${username}) cho lịch tập lúc ${sessionDateTime}`);
            await this.emailService.sendUpcomingSessionReminder(email, username, sessionDateTime);
        }
    }
    
    
}
