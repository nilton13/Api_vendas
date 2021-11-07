import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    //Proucurando Usuários pelo nome.
    public async findByName(name: String): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            }
        });

        return user;
    }
    //Proucurando Usuários pelo Id.
    public async findById(id: String): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            }
        });

        return user;
    }
    //Proucurando Usuários pelo Email.
    public async findByEmail(email: String): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            }
        });

        return user;
    }
}

export default UsersRepository;