import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs'
import AppError from "../../../shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    token: string;
    password: string;
}

//Serviço para alteração de senha
class ResetPasswordService {
    public async execute({token, password}: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User Token does not Exists.');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User does not Exists.');
        }

        //Verificando se o token ainda está válido.
        const tokenCreatedAt = userToken.created_at; // Recuperando a data de criação do Token
        const compareDate = addHours(tokenCreatedAt, 2);

        // Utilizando o isAfter para comparar se a data do token é menor que a data atual.
        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.')
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}

export default ResetPasswordService;