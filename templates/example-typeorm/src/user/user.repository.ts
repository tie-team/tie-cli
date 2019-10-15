import { Injectable } from '@tiejs/common'
import { InjectRepository } from '@tiejs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private userRepository: Repository<User>

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
}
