import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userService;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  async create(data: UserInterface):Promise<UserInterface> {
    return await firstValueFrom(this.userService.CreateUser(data));
  }

  async findAll():Promise<UserInterface[]> {
    return await firstValueFrom(this.userService.GetAllUser({}));
  }

  async findOne(id: number):Promise<UserInterface> {
    return await firstValueFrom(this.userService.GetUser({ id }));
  }

  async update(id: number, data: UserInterface):Promise<UserInterface> {
    return await firstValueFrom(this.userService.UpdateUser({ id, ...data }));
  }

  async remove(id: number):Promise<UserInterface> {
    return await firstValueFrom(this.userService.DeleteUser({ id }));
  }
}
