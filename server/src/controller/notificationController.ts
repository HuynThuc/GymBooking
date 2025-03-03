import express, { Router, Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';
import { UpdateNotificationDTO } from '../dto/update-notification.dto';

const router = express.Router();
const notificationService = new NotificationService();

// Endpoint cập nhật giá trị cấu hình
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
