import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorResponse, successResponse } from 'src/utils/response';

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateUserDto):Promise<any> {
    try {
      const user = await this.userService.create(data);
      return successResponse(user, 'User successfully created', HttpStatus.CREATED);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    
  }

  @Get()
  async findAll(): Promise<UserInterface[] | any> {
    try {
      const users = await this.userService.findAll();
      return successResponse(users,"Successfully Fetch All User",HttpStatus.OK)
    } catch (error) {
      errorResponse(null,error.message,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Get(':id')
  findOne(@Param('id') id: number):Promise<UserInterface> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UserInterface):Promise<UserInterface> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number):Promise<UserInterface> {
    return this.userService.remove(id);
  }
}
