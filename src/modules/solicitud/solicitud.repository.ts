import { EntityRepository, Repository } from 'typeorm';
import { Solicitud } from './solicitud.entity';
@EntityRepository(Solicitud)
export class SolicitudRepository extends Repository<Solicitud> {}