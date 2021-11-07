import path from "path";
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import uploadConfig from '../../../config/upload';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

//Serviço para criação de um novo Usuário.
class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
       
        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not Found!')
        }

        // Verificando se o usuário já possui um avatar e recuperando o caminho dele.
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            
            // Deletando o avatar já existente
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);   
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;