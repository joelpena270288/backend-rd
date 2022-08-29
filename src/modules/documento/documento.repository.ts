import { EntityRepository, Repository } from 'typeorm';
import { Documento } from './document.entity';
@EntityRepository(Documento)
export class DocumentoRepository extends Repository<Documento> {}