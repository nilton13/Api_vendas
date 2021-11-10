import { getCustomRepository } from "typeorm";
import RedisCache from "../../../shared/cache/RedisCache";
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

        const redisCache = new RedisCache();

        //Invalidando o Cache para atualização dos produtos.
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;