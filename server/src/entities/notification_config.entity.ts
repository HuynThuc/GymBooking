import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('notification_config')  // Tên bảng trong cơ sở dữ liệu
export class NotificationConfig {
    @PrimaryGeneratedColumn()
    id!: number;  // Khóa chính của bảng

    @Column({ type: 'varchar', length: 50 })
    type!: string;  // Kiểu thông báo, ví dụ: 'before_session_days', 'remaining_sessions'

    @Column({ type: 'int' })
    value!: number;  // Giá trị cấu hình, ví dụ: 1 ngày, 1 buổi

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;  // Thời gian tạo cấu hình

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;  // Thời gian cập nhật cấu hình
}
