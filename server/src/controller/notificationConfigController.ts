import { Router, Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { AppDataSource } from '../database/db';
import { Notification } from '../entities/notification_config.entity';
import { UpdateNotificationDTO } from '../dto/notification.dto';
import { Order } from '../entities/order.entity';
import { OrderDetail } from '../entities/order_detail.entity';

const router = Router();
const notificationService = new NotificationService(
    AppDataSource.getRepository(Order),
    AppDataSource.getRepository(OrderDetail),
    AppDataSource.getRepository(Notification)
);




// Cập nhật gói tập theo ID
router.put('/update-value', async (req: Request, res: Response) => {
    try {
        const { type, value }: UpdateNotificationDTO = req.body; // Lấy dữ liệu từ body của request
        const updatedConfig = await notificationService.updateNotificationConfig(type, value);
       // Gọi service để cập nhật gói tập
        res.status(200).json(updatedConfig); // Trả về gói tập đã cập nhật
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

export default router;
