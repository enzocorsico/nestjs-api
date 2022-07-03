import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      let user = new User();
      user.username = createUserDto.username;
      user.password = bcrypt.hashSync(createUserDto.password, 10);
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;

      return await user.save();
    } catch (e) {
      throw new HttpException(e.sqlMessage, 400)
    }
  }

  findAll() {
    return User.find();
  }

  findOne(id: number) {
    return User.findOneBy({ 
      id: id 
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await User.findOneBy({
        id: id
      });
  
      user.username = updateUserDto.username;
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
  
      return await user.save();
    } catch (e) {
      throw new HttpException("Une erreur est survenue lors de la modification", 400);
    }
  }

  async remove(id: number) {
    try {
      let user = await User.findOneBy({
        id: id
      });

      return await user.remove();
    } catch (e) {
      throw new HttpException("Une erreur est survenue lors de la suppression", 400);
    }
  }
}
