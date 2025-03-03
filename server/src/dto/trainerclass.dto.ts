// src/interfaces/createTrainerClass.interface.ts

export interface CreateTrainerClassDTO {
    className: string; // Tên lớp học
    description?: string; // Mô tả lớp học (tùy chọn)
    maxParticipants: number; // Số lượng học viên tối đa
    classDate: string; // Ngày diễn ra lớp học (định dạng YYYY-MM-DD)
    startTime: string; // Thời gian bắt đầu (định dạng HH:mm)
    endTime: string; // Thời gian kết thúc (định dạng HH:mm)
    trainerId: number; // ID của huấn luyện viên
    serviceId: number;  // ID của gói dịch vụ
    price: number; // Giá của lớp học
}

// src/dto/trainerclass.dto.ts

export interface UpdateTrainerClassDTO {
    className: string;
    description: string;
    maxParticipants: number;
    classDate: string;
    startTime: string;
    endTime: string;
    trainerId: number;
    serviceId: number;
}

