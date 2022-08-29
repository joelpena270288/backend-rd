import { type } from 'os';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('alertas')
export class Alerta extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  texto: string;
  @ManyToOne(() => User, (user) => user.alertas)
  user: User;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;
}