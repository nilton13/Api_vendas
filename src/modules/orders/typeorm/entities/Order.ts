import {  CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, UsingJoinColumnIsNotAllowedError } from "typeorm";
import Customer from "../../../customers/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Relacionameto muitos pra um.
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
    
    @OneToMany(() => OrdersProducts, order_products => order_products.order ,{
        cascade: true, // Todos os orders products salvos automaticamente ao editar algo.
    })
    order_products : OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;