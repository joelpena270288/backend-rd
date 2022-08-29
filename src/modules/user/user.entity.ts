import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Alerta } from '../alerta/alerta.entity';


import { Role } from '../role/role.entity';
import { Solicitud } from '../solicitud/solicitud.entity';

import { UserDetails } from './user.details.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @Column({ type: 'varchar', length: 4 })
  codigo: string;
  @ManyToMany((type) => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];
  @OneToMany(() => Alerta, (alerta) => alerta.user)
  alertas: Alerta[];

  @Column({ type: 'varchar', length: 8 })
  status: string;
  @OneToMany(() => Solicitud, (solicitud) => solicitud.user)
  solicitudes: Solicitud[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
