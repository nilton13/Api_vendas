import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest{
    id: string;
}


//Serviço para Deletar um Produto.
class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);
        //Recuperando um produto através do ID.
        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not Found');
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;