import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { UserDetails } from './user.details.entity';
import { GetUser } from '../auth/user.decorator';
import { User } from './user.entity';
import { Request } from 'express';
import {CodigoDto} from './dto/codigo.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get('/mi')
  getUser(@GetUser() user: User): Promise<ReadUserDto> {
    return this._userService.get(user.id);
  }

  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL)
  //@UseGuards(AuthGuard(), RoleGuard)
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.update(userId, user);
  }
  
  @Patch()
  activeUser(@Body() param: CodigoDto) {
    return this._userService.activeUser(param.codigo, param.username);
  }
  @Roles(RoleType.ADMIN, RoleType.PROFESOR, RoleType.GENERAL, RoleType.DOCENTE)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('/adddetail')
  updatedetailsUser(@Body() detail: UserDetails, @GetUser() user: User) {
    return this._userService.adddetail(user, detail);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<boolean> {
    return this._userService.delete(userId);
  }
  @Post('/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
