// src/service/trainerClass.service.ts

import { AppDataSource } from '../database/db';
import { TrainerClass } from '../entities/trainer_class.entity';
import { TrainerSchedule } from '../entities/trainerSchedule.entity';
import { Trainer } from '../entities/trainer.entity';
import { Service } from '../entities/service.entity';
import { CreateTrainerClassDTO, UpdateTrainerClassDTO } from '../dto/trainerclass.dto';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Between} from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class TrainerClassService {
    private trainerClassRepository: Repository<TrainerClass>;
    private trainerScheduleRepository: Repository<TrainerSchedule>;
    private trainerRepository: Repository<Trainer>;
    private serviceRepository: Repository<Service>; // Đổi GymPackage thành Service
    constructor() {
        this.trainerClassRepository = AppDataSource.getRepository(TrainerClass);
        this.trainerScheduleRepository = AppDataSource.getRepository(TrainerSchedule);
        this.trainerRepository = AppDataSource.getRepository(Trainer);
        this.serviceRepository = AppDataSource.getRepository(Service);

    }

    // Thêm lớp học mới
    async createClass(createTrainerClassDTO: CreateTrainerClassDTO): Promise<TrainerClass> {
        const {
            className,
            description,
            maxParticipants,
            classDate,
            startTime,
            endTime,
            trainerId,
            price,
            serviceId
        } = createTrainerClassDTO;
    
        // Kiểm tra Trainer
        const trainer = await this.trainerRepository.findOne({ where: { id: trainerId } });
        if (!trainer) {
            throw new HttpException('Trainer không tồn tại!', HttpStatus.NOT_FOUND);
        }
    
        // Kiểm tra Service
        const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new HttpException('Service không tồn tại!', HttpStatus.NOT_FOUND);
        }
    
        const parsedClassDate = new Date(classDate);
    
        // Lấy tất cả các lớp học của trainer trong ngày đó
        const existingClasses = await this.trainerClassRepository.find({
            where: {
                trainer: { id: trainerId },
                classDate: Between(
                    new Date(parsedClassDate.setHours(0, 0, 0, 0)),
                    new Date(parsedClassDate.setHours(23, 59, 59, 999))
                )
            }
        });
    
        // Convert thời gian của lớp mới sang minutes để dễ so sánh
        const [newStartHour, newStartMinute] = startTime.split(':').map(Number);
        const [newEndHour, newEndMinute] = endTime.split(':').map(Number);
        const newStartMinutes = newStartHour * 60 + newStartMinute;
        const newEndMinutes = newEndHour * 60 + newEndMinute;
    
        // Kiểm tra trùng lịch
        const hasScheduleConflict = existingClasses.some(existingClass => {
            const [existingStartHour, existingStartMinute] = existingClass.startTime.split(':').map(Number);
            const [existingEndHour, existingEndMinute] = existingClass.endTime.split(':').map(Number);
            const existingStartMinutes = existingStartHour * 60 + existingStartMinute;
            const existingEndMinutes = existingEndHour * 60 + existingEndMinute;
    
            return (
                (newStartMinutes >= existingStartMinutes && newStartMinutes < existingEndMinutes) ||
                (newEndMinutes > existingStartMinutes && newEndMinutes <= existingEndMinutes) ||
                (newStartMinutes <= existingStartMinutes && newEndMinutes >= existingEndMinutes)
            );
        });
    
        if (hasScheduleConflict) {
            throw new HttpException(
                'Thời gian lớp học bị trùng với lớp học khác của Trainer!',
                HttpStatus.BAD_REQUEST
            );
        }
    
        // Lấy danh sách lịch rảnh của Trainer trong ngày đó
        const trainerSchedules = await this.trainerScheduleRepository.find({
            where: {
                trainer: { id: trainerId },
                date: classDate
            }
        });
    
        // Kiểm tra thời gian lớp học có nằm trong khoảng thời gian rảnh không
        const isTimeValid = trainerSchedules.some(schedule => {
            const [scheduleStartHour, scheduleStartMinute] = schedule.start_time.split(':').map(Number);
            const [scheduleEndHour, scheduleEndMinute] = schedule.end_time.split(':').map(Number);
            const scheduleStartMinutes = scheduleStartHour * 60 + scheduleStartMinute;
            const scheduleEndMinutes = scheduleEndHour * 60 + scheduleEndMinute;
    
            return newStartMinutes >= scheduleStartMinutes && newEndMinutes <= scheduleEndMinutes;
        });
    
        if (!isTimeValid) {
            throw new HttpException(
                'Thời gian lớp học không nằm trong khoảng thời gian rảnh của Trainer!',
                HttpStatus.BAD_REQUEST
            );
        }
    
        // Tạo lớp học
        const trainerClass = this.trainerClassRepository.create({
            className,
            description,
            maxParticipants,
            currentParticipants: 0,
            classDate: parsedClassDate,
            startTime,
            endTime,
            trainer,
            price,
            service,
            isAvailable: true
        });
    
        return await this.trainerClassRepository.save(trainerClass);
    }
    

    // Lấy các lớp học của Trainer theo serviceId
    async getClassesByTrainerAndService(trainerId: number, serviceId: number): Promise<TrainerClass[]> {
        // Kiểm tra xem trainer có tồn tại không
        const trainer = await this.trainerRepository.findOne({ where: { id: trainerId } });
        if (!trainer) {
            throw new HttpException('Trainer không tồn tại!', HttpStatus.NOT_FOUND);
        }

        // Kiểm tra xem service có tồn tại không
        const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new HttpException('Service không tồn tại!', HttpStatus.NOT_FOUND);
        }

        // Lấy danh sách các lớp học của trainer và service cụ thể
        const classes = await this.trainerClassRepository.find({
            where: {
                trainer: { id: trainerId },
                service: { id: serviceId }
            },
            relations: ['trainer', 'service'], // Lấy thêm thông tin service và trainer
        });

        return classes;
    }

     // Lấy tất cả gói dịch vụ
     async getAll(): Promise<TrainerClass[]> {
        return await this.trainerClassRepository.find();
    }

    // Hàm cập nhật lớp học
    async updateClass(id: number, updateTrainerClassDTO: UpdateTrainerClassDTO): Promise<TrainerClass> {
        const {
            className,
            description,
            maxParticipants,
            classDate,
            startTime,
            endTime,
            trainerId,
            serviceId
        } = updateTrainerClassDTO;

        // Kiểm tra xem lớp học có tồn tại không
        const trainerClass = await this.trainerClassRepository.findOne({ where: { id } });
        if (!trainerClass) {
            throw new HttpException('Lớp học không tồn tại!', HttpStatus.NOT_FOUND);
        }

        // Kiểm tra Trainer
        const trainer = await this.trainerRepository.findOne({ where: { id: trainerId } });
        if (!trainer) {
            throw new HttpException('Trainer không tồn tại!', HttpStatus.NOT_FOUND);
        }

        // Kiểm tra Service
        const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new HttpException('Service không tồn tại!', HttpStatus.NOT_FOUND);
        }

        // Cập nhật thông tin lớp học
        trainerClass.className = className;
        trainerClass.description = description;
        trainerClass.maxParticipants = maxParticipants;
        trainerClass.classDate = new Date(classDate);
        trainerClass.startTime = startTime;
        trainerClass.endTime = endTime;
        trainerClass.trainer = trainer;
        trainerClass.service = service;

        return await this.trainerClassRepository.save(trainerClass);
    }
}
