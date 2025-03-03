import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { OrderDetail } from './order_detail.entity'; // Liên kết với OrderDetail
import { Service } from './service.entity'; // Import Service
import { TrainerSchedule } from './trainerSchedule.entity';
import { scheduler } from 'timers/promises';

@Entity('trainer') // Tên bảng trong cơ sở dữ liệu
export class Trainer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    trainerName!: string; // Tên của huấn luyện viên

    @Column({ type: 'varchar', length: 255 })
    gender!: string; // Giới tính của huấn luyện viên

    @Column({ type: 'int' })
    experience_years!: number; // Số năm kinh nghiệm

    @Column({ type: 'text', nullable: true })
    bio?: string; // Thông tin mô tả ngắn về huấn luyện viên

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string; // Đường dẫn đến ảnh đại diện

    @ManyToMany(() => Service) // Quan hệ nhiều-nhiều với Service
    @JoinTable() // Tạo bảng liên kết tự động
    services!: Service[];

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.trainer)
    orderDetails!: OrderDetail[]; // Quan hệ với bảng OrderDetail

    @OneToMany(() => TrainerSchedule, schedule => schedule.trainer)
    schedules!: TrainerSchedule[];
}
