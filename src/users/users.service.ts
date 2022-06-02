import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '../role/role.enum';

const logger = new Logger('users')
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
        /*this.create({
            "username":"agent2@agent2.com",
            "password":"password",
            "permission": "technician"
        })*/
    }

    async create(CreateUserDto: any) {
        return new Promise(async (resolve, reject) => {
            try {
                if (CreateUserDto.roles == 'admin') {
                    CreateUserDto.roles = [Role.Admin]
                } else if (CreateUserDto.roles == 'technician') {
                    CreateUserDto.roles = [Role.Technician]
                } else if (CreateUserDto.roles == 'user') {
                    CreateUserDto.roles = [Role.User]
                } else {
                    const msg = `The role must name admin, technician, or user.`
                    resolve(msg)
                    logger.log(msg)
                    return
                }
                let Create = new this.UserModel(CreateUserDto)
                await Create.save()
                const msg = `Created User`
                resolve(msg)
                logger.log(msg)
            } catch (error) {
                logger.log(error);
                resolve(error.message);
            }
        })
    }

    async findOne(username: string): Promise<UserDocument | undefined> {
        return await this.UserModel.findOne({ username: username })
    }

}