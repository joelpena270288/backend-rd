import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { status } from 'src/shared/entity-status.enum';
import { CreateRoleDto, ReadRoleDto } from './dtos';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async get(id: string): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const role: Role = await this._roleRepository
      .createQueryBuilder('role')
      .where('role.id = :id', { id: id })
      .andWhere('role.status = :status', { status: status.ACTIVE })
      .getOne();
    if (!role) {
      throw new NotFoundException();
    }
    return plainToClass(ReadRoleDto, role);
  }
  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }
  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }
  async update(
    rolid: string,
    role: Partial<CreateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository
    .createQueryBuilder('role')
    .where('role.id = :id', { id: rolid })
    .andWhere('role.status = :status', { status: status.ACTIVE })
    .getOne();
    if (!foundRole) {
      throw new NotFoundException('This rol not exist');
    }
    foundRole.name = role.name;
    foundRole.descripcion = role.descripcion;
    const updatedRole: Role = await this._roleRepository.save(foundRole);
    return plainToClass(ReadRoleDto, updatedRole);
  }
  async delete(id: string): Promise<void> {
    const RoleExixist: Role = await this._roleRepository
    .createQueryBuilder('role')
    .where('role.id = :id', { id: id })
    .andWhere('role.status = :status', { status: status.ACTIVE })
    .getOne();
    if (!RoleExixist) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
