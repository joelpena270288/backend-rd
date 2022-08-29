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
import { Documento } from '../documento/document.entity';
import { User } from '../user/user.entity';
import { EstadoSolicitud } from './estados.enum';
@Entity('solicitudes')
export class Solicitud extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', unique: true, length: 30, nullable: false })
  codigo: string;
  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.CREADA,
  })
  estado: EstadoSolicitud;
  @OneToMany(() => Documento, (documento) => documento.solicitud)
  documentos: Documento[]
  @ManyToOne(() => User, (user) => user.solicitudes)
  user: User;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;
}
