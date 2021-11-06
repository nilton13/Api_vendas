import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

//Serviço para listagem dos Produtos.
class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);
        //Recuperando todos os produtos do repositório.
        const products = productsRepository.find();

        return products;
    }
}

export default ListProductService;