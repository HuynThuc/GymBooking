import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Trainer } from './trainer.entity';
import { Service } from './service.entity';
import { OrderDetail } from './order_detail.entity';

@Entity('trainer_class')
export class TrainerClass {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    className!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'int' })
    maxParticipants!: number;

    @Column({ type: 'int', default: 0 })
    currentParticipants!: number;

    @Column({ type: 'date' })
    classDate!: Date;

    @Column({  })
    startTime!: string;

    @Column({  })
    endTime!: string;

    @Column({ type: 'boolean', default: true })
    isAvailable!: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price!: number; // Thêm cột giá

    @ManyToOne(() => Trainer, { nullable: false })
    @JoinColumn({ name: 'trainer_id' })
    trainer!: Trainer;

    @ManyToOne(() => Service, service => service.classes, { nullable: false })
    @JoinColumn({ name: 'service_id' })
    service!: Service;

     // Thêm mối quan hệ one-to-many với OrderDetail
     @OneToMany(() => OrderDetail, orderDetail => orderDetail.trainerClass)
     orderDetails!: OrderDetail[]; // Tất cả các chi tiết đơn hàng liên quan đến lớp học này

   
}