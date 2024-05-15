import { MongoTodoRepository } from '../infra/repositories/users-repositories';

export class UserDataService {
  userRepository: MongoTodoRepository;
  constructor () {
    this.userRepository = new MongoTodoRepository();
  }
  async getUserData (id: string) {
    const userData = await this.userRepository.getUserById(id);
    console.log(userData);
    return userData;
  }
}
