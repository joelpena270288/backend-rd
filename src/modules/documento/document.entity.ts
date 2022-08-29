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
import { Solicitud } from '../solicitud/solicitud.entity';
import { User } from '../user/user.entity';
import { EstadoDocumento } from './estados.enum';
@Entity('documentos')
export class Documento extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  dirurl: string;
  @Column({
    type: 'enum',
    enum: EstadoDocumento,
    default: EstadoDocumento.CREADA,
  })
  estado: EstadoDocumento;
  @ManyToOne(() => Solicitud, (solicitud) => solicitud.documentos)
  solicitud: Solicitud;
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'update_at' })
  updatedAt: Date;
}