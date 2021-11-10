import { EntityRepository, Repository } from "typeorm";
import Customer from "../../../customers/typeorm/entities/Customer";
import Order from "../entities/Order";

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

    public async findById(id: string): Promise<Order | undefined> {
        const order = this.findOne(id, {
            relations: ['order_products', 'customer'],
        });
        
        return order;
    }
    // Criando um pedido
    public async createOrder({ customer, products }: IRequest): Promise<Order>{
        const order = this.create({
            customer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }

}