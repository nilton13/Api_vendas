import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

//Serviço para criação de um novo Usuário.
class CreateCustomerService {
    public async execute({name,email}: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const emailExists = await customersRepository.findByEmail(email);

        //Verificando se o email informado já pertence a um Usuário
        if(emailExists){
            throw new AppError('Email address already used.');
        }

        const customer = customersRepository.create({
            name,
            email,
        })

        await customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;