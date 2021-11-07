import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;  
}  

interface IResponse{
    user: User,
    token: string
}

//Serviço para criação de um novo Usuário.
class CreateSessionsService {
    public async execute({email,password}: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        //Verificando se o email informado já pertence a um Usuário
        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password,user.password);

        if(!passwordConfirmed){
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, '51f9c8058d1e3760e590d686509224b3', {
            subject: user.id,
            expiresIn: '1d', // Tempo de duração. 
        })

        return {
            user,
            token,
        };
    }
}

export default CreateSessionsService;