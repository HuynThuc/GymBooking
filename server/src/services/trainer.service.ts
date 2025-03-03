import { AppDataSource } from '../database/db';
import { Trainer } from '../entities/trainer.entity';
import { Service } from '../entities/service.entity'; // Import Service entity
import { Repository } from 'typeorm';
import { TrainerDTO } from '../dto/trainer.dto'; // Import DTOs

export class TrainerService {
    private trainerRepository: Repository<Trainer>;
    private serviceRepository: Repository<Service>;

    constructor(
        trainerRepository: Repository<Trainer> = AppDataSource.getRepository(Trainer), 
        serviceRepository: Repository<Service> = AppDataSource.getRepository(Service)
    ) {
        this.trainerRepository = trainerRepository; 
        this.serviceRepository = serviceRepository; 
    }

    // Lấy tất cả huấn luyện viên
    async getAll(): Promise<Trainer[]> {
        return await this.trainerRepository.find(); // Lấy tất cả huấn luyện viên
    }

    // Lấy huấn luyện viên theo ID
    async getById(id: number): Promise<Trainer | null> {
        return await this.trainerRepository.findOne({
            where: { id },
            relations: ['services'] // Bao gồm thông tin về dịch vụ của huấn luyện viên
        });
    }

    // Tạo mới huấn luyện viên
    async create(trainerData: TrainerDTO, imageFile?: Express.Multer.File): Promise<Trainer> {
        const services = await this.serviceRepository.findByIds(trainerData.serviceIds);

        if (!services || services.length === 0) {
            throw new Error('No services found for the trainer');
        }

        const trainer = this.trainerRepository.create({
            ...trainerData,
            services, // Liên kết các dịch vụ
            image: imageFile ? imageFile.filename : undefined
        });

        return await this.trainerRepository.save(trainer);
    }

    // Lấy danh sách huấn luyện viên theo Service ID
    async getByServiceId(serviceId: number): Promise<Trainer[]> {
        return await this.trainerRepository.find({
            where: { services: { id: serviceId } }, // Lọc theo serviceId
            relations: ['services'] // Bao gồm thông tin về dịch vụ của huấn luyện viên
        });
    }

    // Cập nhật huấn luyện viên
    async update(id: number, trainerData: TrainerDTO, imageFile?: Express.Multer.File): Promise<Trainer | null> {
        const trainer = await this.trainerRepository.findOne({ where: { id } });
        
        if (!trainer) {
            throw new Error('Trainer not found');
        }

        const services = await this.serviceRepository.findByIds(trainerData.serviceIds);
        if (!services || services.length === 0) {
            throw new Error('No services found');
        }

        this.trainerRepository.merge(trainer, {
            ...trainerData,
            services, // Cập nhật các dịch vụ
            image: imageFile ? imageFile.filename : trainer.image // Giữ ảnh cũ nếu không có ảnh mới
        });

        return await this.trainerRepository.save(trainer);
    }

    // Xóa huấn luyện viên theo ID
    async delete(id: number): Promise<void> {
        await this.trainerRepository.delete(id); // Xóa huấn luyện viên
    }
}
