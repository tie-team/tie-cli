import { Controller, Get, Params, Post, Body } from '@tiejs/controller'
import { User } from './user.type'
import { UserService } from './user.service'
import { CreateUserInput } from './createUser.input'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users/:name')
  async user(@Params('name') name: string): Promise<User> {
    return await this.userService.getUser(name)
  }

  @Get('/users')
  async users(): Promise<User[]> {
    return await this.userService.queryUser()
  }

  @Post('/users')
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }
}
