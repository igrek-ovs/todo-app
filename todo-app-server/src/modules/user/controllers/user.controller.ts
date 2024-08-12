import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserIdQueryDto } from "../../../common/dto";
import { GetUserResultDto, UpdateUserDto, UpdateUserPasswordDto, UserDto } from "../dto";
import { UserService } from "../services";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async getUserById(@Query() query: UserIdQueryDto): Promise<GetUserResultDto> {
    const { userId } = query;
    const user = await this.userService.getById(userId);
    return { id: user.id, email: user.dataValues.email };
  }

  @Get()
  async getAll(): Promise<GetUserResultDto[]> {
    const users = await this.userService.getAll();
    return users.map(user => ({
        id: user.id, email: user.email,
      }
    ));
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<GetUserResultDto> {
    const user = await this.userService.create(userDto);
    return { id: user.id, email: user.email };
  }

  @Put()
  async updateUser(@Query() query: UserIdQueryDto, @Body() oldUser: UpdateUserDto): Promise<GetUserResultDto> {
    const { userId } = query;
    const user = await this.userService.update(userId, oldUser);
    return { id: user.id, email: user.email };
  }

  @Put()
  async updateUserPassword(@Query() query: UserIdQueryDto, @Body() oldUser: UpdateUserPasswordDto): Promise<GetUserResultDto> {
    const { userId } = query;
    const user = await this.userService.changePassword(userId, oldUser.password);
    return { id: user.id, email: user.email };
  }

  @Delete()
  async deleteUser(@Query() query: UserIdQueryDto): Promise<void> {
    const { userId } = query;
    return await this.userService.delete(userId);
  }
}
