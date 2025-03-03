import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { UserGymPackage } from './user_gymPackage.entity';
import { GymPackage } from './gymPackage.entity';
import { Trainer } from './trainer.entity';
import { TrainerClass } from './trainer_class.entity';

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    serviceName!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'text', nullable: true })
    content?: string;
    
    @Column({ type: 'varchar', length: 50, nullable: true })
    layout?: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ 
        type: 'enum', 
        enum: ['PERSONAL_TRAINING', 'CLASS_BASED'],
        
    })
    type!: 'PERSONAL_TRAINING' | 'CLASS_BASED';

    @OneToMany(() => UserGymPackage, userGymPackage => userGymPackage.service)
    users!: UserGymPackage[];

    @OneToMany(() => GymPackage, gymPackage => gymPackage.service)
    gymPackages!: GymPackage[];

    @ManyToMany(() => Trainer)
    trainers!: Trainer[];

    @OneToMany(() => TrainerClass, trainerClass => trainerClass.service)
    classes!: TrainerClass[];
}