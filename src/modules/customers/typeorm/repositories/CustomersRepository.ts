import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
    public async findByName(name: String): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                name,
            }
        });

        return customer;
    }

    public async findById(id: String): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                id,
            }
        });

        return customer;
    }
    
    public async findByEmail(email: String): Promise<Customer | undefined> {
        const user = await this.findOne({
            where: {
                email,
            }
        });

        return user;
    }
}

export default CustomersRepository;