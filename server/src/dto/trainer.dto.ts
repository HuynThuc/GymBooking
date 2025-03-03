export interface TrainerDTO {
    trainerName: string; // Tên của huấn luyện viên
    gender: string; // Giới tính của huấn luyện viên
    experience_years: number; // Số năm kinh nghiệm
    bio?: string; // Thông tin mô tả ngắn về huấn luyện viên
    image?: string;
    serviceIds: number[]; // Đường dẫn đến ảnh đại diện
}