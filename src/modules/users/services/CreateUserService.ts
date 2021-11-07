import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

//Serviço para criação de um novo Usuário.
class CreateUserService {
    public async execute({name,email,password}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        //Verificando se o email informado já pertence a um Usuário
        if(emailExists){
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;