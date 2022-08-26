import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadUserDto, UpdateUserDto, UserDto } from './dto';
import { plainToClass } from 'class-transformer';

import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async get(id: string): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository
      .createQueryBuilder('user')
      .where('user.id= :id', { id: id })
      .andWhere('user.status=:status', { status: status.ACTIVE })
      .getOne();
    if (!user) {
      throw new NotFoundException();
    }
    return plainToClass(ReadUserDto, user);
  }
  async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async update(userid: string, user: UpdateUserDto): Promise<ReadUserDto> {
    const founduser: User = await this._userRepository
      .createQueryBuilder('user')
      .where('user.id= :id', { id: userid })
      .andWhere('user.status=:status', { status: status.ACTIVE })
      .getOne();
    if (!founduser) {
      throw new NotFoundException('user not exist');
    }
    founduser.username = user.username;
    founduser.email = user.email;
    const updateduser = await this._userRepository.save(founduser);

    return plainToClass(ReadUserDto, updateduser);
  }

  async delete(userId: string): Promise<boolean> {
    const userExist: User = await this._userRepository
    .createQueryBuilder('user')
    .where('user.id= :id', { id: userId })
    .andWhere('user.status=:status', { status: status.ACTIVE })
    .getOne();
    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }
    await this._userRepository.update(userId, { status: status.INACTIVE });
    return true;
  }
  async setRoleToUser(userId: string, roleId: string): Promise<boolean> {
    const userExist: User = await this._userRepository
    .createQueryBuilder('user')
    .where('user.id= :id', { id: userId })
    .andWhere('user.status=:status', { status: status.ACTIVE })
    .getOne();
    if (!userExist) {
      throw new NotFoundException('Usuario no existe');
    }
    const roleExist: Role = await this._roleRepository 
    .createQueryBuilder('role')
    .where('role.id= :id', { id: roleId })
    .andWhere('user.status=:status', { status: status.ACTIVE })
    .getOne();
    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }
    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }
  async adddetail(user: User, userdetail: UserDetails): Promise<ReadUserDto> {
    const founduser: User = await this._userRepository
    .createQueryBuilder('user')
    .where('user.id= :id', { id: user.id })
    .andWhere('user.status=:status', { status: status.ACTIVE })
    .getOne();
    if (!founduser) {
      throw new NotFoundException('user not exist');
    }
    if (userdetail.name !== '') {
      founduser.details.name = userdetail.name;
    }
    if (userdetail.lastname !== '') {
      founduser.details.lastname = userdetail.lastname;
    }
    if (userdetail.sex !== '') {
      founduser.details.sex = userdetail.sex;
    }
    if (userdetail.age !== 0) {
      founduser.details.age = userdetail.age;
    }
    if (userdetail.photo !== '') {
      founduser.details.photo = userdetail.photo;
    }
    if (userdetail.education !== '') {
      founduser.details.education = userdetail.education;
    }
    if (userdetail.intereses !== '') {
      founduser.details.intereses = userdetail.intereses;
    }

    const updateduser = await this._userRepository.save(founduser);

    return plainToClass(ReadUserDto, updateduser);
  }
  async activeUser(codigo: string, user: string): Promise<boolean> {
    const userfound = await this._userRepository.findOne({
      where: { username: user },
    });
    if (userfound) {
      if (userfound.codigo === codigo) {
        userfound.status = 'ACTIVE';
        await userfound.save();
      } else {
        throw new BadRequestException('this code is false');
      }
    } else {
      throw new NotFoundException('user not exist');
    }
    return true;
  }
}
