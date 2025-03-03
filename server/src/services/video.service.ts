import { AppDataSource } from '../database/db';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';

export class VideoService {
    private videoRepository = AppDataSource.getRepository(Video); // Repository của Video

    constructor(videoRepository: Repository<Video>) {
        this.videoRepository = videoRepository; // Gán repository vào instance
    }

    // Hàm cập nhật video
    async update(id: number, file: Express.Multer.File): Promise<Video> {
        try {
            // Kiểm tra xem file có tồn tại không
            if (!file) {
                throw new Error('Không có file video được tải lên');
            }

            // Tìm video theo ID
            const video = await this.videoRepository.findOne({
                where: { id }, // Tìm theo ID
            });

            if (!video) {
                throw new Error('Video không tồn tại');
            }

            // Cập nhật đường dẫn video
            video.url = file.filename;

            // Lưu lại video đã cập nhật
            return await this.videoRepository.save(video);
        } catch (error) {
            console.error('Lỗi khi cập nhật video:', error);
            throw new Error('Không thể cập nhật video');
        }
    }

    async getAllVideos(): Promise<Video[]> {
        try {
            const videos = await this.videoRepository.find(); // Lấy tất cả video
    
            if (!videos.length) {
                throw new Error('Không có video nào trong cơ sở dữ liệu');
            }
    
            return videos; // Trả về danh sách video
        } catch (error) {
            console.error('Lỗi khi lấy tất cả video:', error);
            throw new Error('Không thể lấy danh sách video');
        }
    }
}
