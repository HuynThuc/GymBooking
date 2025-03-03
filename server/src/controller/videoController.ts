import { Router, Request, Response } from 'express';
import { VideoService } from '../services/video.service';
import { Video } from '../entities/video.entity';
import { AppDataSource } from '../database/db';
import multer from 'multer';
import { multerConfig } from '../config/multer.config';

const router = Router();

// Khởi tạo VideoService với repository của Video
const videoService = new VideoService(AppDataSource.getRepository(Video));

// Cấu hình multer cho việc upload file
const upload = multer(multerConfig);

// Route để cập nhật video
router.put('/updateVideo/:id', upload.single('url'), async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  // Lấy ID từ tham số URL

        // Kiểm tra xem có file nào được upload không
        if (!req.file) {
            res.status(400).json({ message: 'Không có file video được tải lên' });
            return;
        }

        // Gọi VideoService để cập nhật video với ID và file
        const video = await videoService.update(Number(id), req.file);

        // Trả về video sau khi cập nhật thành công
        res.status(200).json(video);
    } catch (error: unknown) {
        // Xử lý lỗi nếu có
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật video' });
        }
    }
});


// Route để lấy tất cả video
router.get('/getAllVideos', async (req: Request, res: Response): Promise<void> => {
    try {
        // Gọi hàm getAllVideos từ VideoService để lấy tất cả video
        const videos = await videoService.getAllVideos();

        // Trả về danh sách video
        res.status(200).json(videos);
    } catch (error: unknown) {
        // Xử lý lỗi nếu có
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách video' });
        }
    }
});
export default router;
