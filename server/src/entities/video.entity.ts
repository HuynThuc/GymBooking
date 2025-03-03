import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('videos')
  export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 255 })
    title!: string; // Tiêu đề video
  
    @Column({ length: 255 })
    url!: string; // Đường dẫn video
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date; // Thời gian tạo video
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date; // Thời gian cập nhật video
  }
  