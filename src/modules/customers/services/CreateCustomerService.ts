import AppError from "../../../shared/errors/AppError";
import { injectable ,inject } from 'tsyringe'
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepositoy";

interface IRequest {
    name: string;
    email: string;
}

//Serviço para criação de um novo Usuário.
@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
        ){}

    public async execute({name,email}: IRequest): Promise<ICustomer> {
        const emailExists = await this.customersRepository.findByEmail(email);

        //Verificando se o email informado já pertence a um Usuário
        if(emailExists){
            throw new AppError('Email address already used.');
        }

        const customer = await this.customersRepository.create({
            name,
            email,
        })

        await this.customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;