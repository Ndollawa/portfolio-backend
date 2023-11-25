import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserInterface } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterQuery } from 'mongoose';
import { RequestService } from '@/modules/request.service';

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly requestService: RequestService,
  ) {}

  async findUser(
    userData: FilterQuery<UserInterface>,
    projection?: any,
  ): Promise<UserInterface> {
    return await this.userRepository.findOne(userData, projection);
  }

  async getUsers(): Promise<UserInterface[]> {
    return this.userRepository.find(
      {},
      { _id: 1, password: 0, refreshToken: 0 },
    );
  }

  async createUser(createUserData: CreateUserDto): Promise<UserInterface> {
    const { username, email, password, confirmPassword } = createUserData;

    if (password !== confirmPassword)
      throw new BadRequestException('password mis-match');
    //check for duplicate emails in the DB
    const duplicate = await this.findUser({
      $or: [{ username }, { email }],
    });
    if (duplicate) {
      throw new ConflictException('User with credentials already exist.');
    }
    //encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create and save new User
    const userData = {
      ...createUserData,
      password: hashedPassword,
      roles: { USER: 3000 },
    };
    return this.userRepository.create(userData);
  }

  async updateUser(
    userId: string,
    updateUserData: UpdateUserDto,
  ): Promise<UserInterface> {
    return this.userRepository.findOneAndUpdate(
      { _id: userId },
      updateUserData,
    );
  }

  async authenticateUser(userCredentials): Promise<any> {
    const { user, password } = userCredentials;
    const EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const userType = EMAIL_REGEX.test(user);
    const userQuery = userType ? { email: user } : { username: user };
    const foundUser = await this.findUser(userQuery);
    if (!foundUser) throw new NotFoundException('Invalid credentials');
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return foundUser;
  }

  async saveUserRefreshToken(
    user: UserInterface,
    refreshToken: string[],
  ): Promise<void> {
    user.refreshToken = refreshToken;
    console.log(user);
    await user.save;
  }
  async deleteUserById(userId: string): Promise<boolean> {
    return this.userRepository.deleteOne({ _id: userId });
  }

  async deleteManyUsers(userIds: string): Promise<boolean> {
    return this.userRepository.deleteMany({ _id: userIds });
  }
}
