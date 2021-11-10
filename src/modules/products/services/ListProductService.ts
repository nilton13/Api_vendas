import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from "../../../shared/cache/RedisCache";

//Serviço para listagem dos Produtos.
class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        //Primeiro verifica se há a lista de produtos na Cache
        let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

        // Se não houver:
        if(!products){
            //Recuperando todos os produtos do repositório.
            products = await productsRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products)
        }
        
        return products;
    }
}

export default ListProductService;