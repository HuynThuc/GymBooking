import { Router, Request, Response } from 'express';
import { TrainerClassService } from '../services/trainerclass.service';
import { CreateTrainerClassDTO, UpdateTrainerClassDTO } from '../dto/trainerclass.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

const router = Router();
const trainerClassService = new TrainerClassService();



router.get('/getAllClass', async (req: Request, res: Response) => {
    try {
        const trainerClass = await trainerClassService.getAll();
        res.status(200).json(trainerClass);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
router.post('/create', async (req: Request, res: Response) => {
    try {
        const createTrainerClassDTO: CreateTrainerClassDTO = req.body;
        const trainerClass = await trainerClassService.createClass(createTrainerClassDTO);

        res.status(201).json({
            message: 'Tạo lớp học thành công!',
            data: trainerClass,
        });
    } catch (error) {
        let errorMessage = 'Đã xảy ra lỗi!';

        if (error instanceof HttpException) {
            errorMessage = error.message;
            res.status(error.getStatus()).json({
                message: errorMessage,
            });
        } else {
            errorMessage = 'Đã xảy ra lỗi trong quá trình tạo lớp học!';
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: errorMessage,
            });
        }

        console.error('Lỗi:', error);
    }
});


// Endpoint để lấy danh sách lớp học theo trainerId và serviceId
router.get('/byTrainerAndService/:trainerId/:serviceId', async (req: Request, res: Response) => {
    try {
        // Lấy trainerId và serviceId từ params
        const trainerId = parseInt(req.params.trainerId);
        const serviceId = parseInt(req.params.serviceId);

        // Gọi service để lấy danh sách lớp học
        const classes = await trainerClassService.getClassesByTrainerAndService(trainerId, serviceId);

        // Trả về response thành công
        res.status(200).json({
            message: 'Lấy danh sách lớp học theo huấn luyện viên và dịch vụ thành công!',
            data: classes,
        });
    } catch (error) {
        // Xử lý lỗi và trả về response phù hợp
        if (error instanceof HttpException) {
            res.status(error.getStatus()).json({
                message: error.message,
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Đã xảy ra lỗi trong quá trình lấy danh sách lớp học!',
            });
        }
    }
});


// Endpoint để cập nhật lớp học
router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const classId = parseInt(req.params.id); // Lấy classId từ params
        const updateTrainerClassDTO: UpdateTrainerClassDTO = req.body;

        // Gọi service để cập nhật lớp học
        const updatedTrainerClass = await trainerClassService.updateClass(classId, updateTrainerClassDTO);

        // Trả về response thành công
        res.status(200).json({
            message: 'Cập nhật lớp học thành công!',
            data: updatedTrainerClass,
        });
    } catch (error) {
        // Xử lý lỗi và trả về response phù hợp
        if (error instanceof HttpException) {
            res.status(error.getStatus()).json({
                message: error.message,
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Đã xảy ra lỗi trong quá trình cập nhật lớp học!',
            });
        }
    }
});
export default router;
