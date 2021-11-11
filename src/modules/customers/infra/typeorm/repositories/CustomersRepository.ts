import { getRepository, Repository } from "typeorm";
import { ICreateCustomer } from "../../../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../../../domain/repositories/ICustomersRepositoy";
import Customer from "../entities/Customer";


class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;
    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({ name, email });
        
        await this.ormRepository.save(customer);

        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        await this.ormRepository.save(customer);

        return customer;
    }

    public async findByName(name: String): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                name,
            }
        });

        return customer;
    }

    public async findById(id: String): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                id,
            }
        });

        return customer;
    }
    
    public async findByEmail(email: String): Promise<Customer | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            }
        });

        return user;
    }
}

export default CustomersRepository;