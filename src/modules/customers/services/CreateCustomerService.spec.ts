import 'reflect-metadata';
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

describe('Create Customer', () => {
    // Espera criar um novo cliente
    it('should be able to create a new customer', async () => {
        const fakeCustomersRepository = new FakeCustomersRepository();

        const createCustomerService = new CreateCustomerService(fakeCustomersRepository);

        const customer = await createCustomerService.execute({
            name: 'Nilton',
            email: 'teste@email.com',
        });

        expect(customer).toHaveProperty('id');
    });

    // Não posso criar dois clientes com o mesmo email
    it('should not be able to create two customers with the same email', async () => {
        const fakeCustomersRepository = new FakeCustomersRepository();

        const createCustomerService = new CreateCustomerService(fakeCustomersRepository);

        await createCustomerService.execute({
            name: 'Nilton',
            email: 'teste@email.com',
        });

        expect(
            createCustomerService.execute({
                name: 'Nilton',
                email: 'teste@email.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});